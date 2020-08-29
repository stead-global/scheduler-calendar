import React from 'react'
import styles from './Calendar.module.css'
import TopHeader from '../TopHeader/TopHeader'
import TableHeader from '../TableHeader/TableHeader'
import moment from 'moment'
import TableContent from '../TableContent/TableContent'
import { getDateRangeTitle } from '../../Utils'
import ViewModal from '../AvailabilityDialog/AvailabilityDialog'
import ArrowLeftIcon from '../../assets/Icons/ArrowLeftIcon'
// eslint-disable-next-line no-unused-vars
import { AvailabilityIntervals, Availabilities } from '../../Interfaces'
import clsx from 'clsx'
import OverrideConfirmationDialog from '../OverrideConfirmationDialog/OverrideConfirmationDialog'
import { PeriodsOfDay } from '../AddIntervalSection/AddIntervalSection'

type OverRideData = {
  isOverride: boolean
  count: number
  day: string
  overridedValues: Availabilities[]
  currentValue: Availabilities[]
}

interface CalendarProps {
  availabilityType: string
  availabilityEndDate?: string
  availabilityStartDate?: string
  availabilityRolling?: number
  duration: number
  availabilities: Availabilities[]
  onIntervalChange: (value: Availabilities[]) => void
  className?: string
  initialRenderOfRows?: number
  totalNumOfRows?: number
  tableContainerStyle?: string
  dayTextStyle?: string
  dayConstainerStyle?: string
  intervalsWrapStyle?: string
  is24hour: boolean
}

interface CalendarState {
  availabilities: Availabilities[]
  date: Date
  isAvailabilityModal: boolean
  selectedDay: string
  numRowsRender: number
  availabilityIntervals: AvailabilityIntervals
  isCollapsedView: boolean
  isOverrideConfirmation: OverRideData
  availabilityStartDate: string
  availabilityEndDate: string
  availibilityRangeData: any
}

enum availabilityTypes {
  // eslint-disable-next-line no-unused-vars
  Rolling = 'rolling',
  // eslint-disable-next-line no-unused-vars
  Range = 'range',
  // eslint-disable-next-line no-unused-vars
  Infinity = 'infinity'
}

export default class Calendar extends React.Component<
  CalendarProps,
  CalendarState
> {
  constructor(props: CalendarProps) {
    super(props)
    this.state = {
      date: moment().startOf('week').toDate(),
      isAvailabilityModal: false,
      numRowsRender: props.initialRenderOfRows
        ? props.initialRenderOfRows + 1
        : 4,
      isCollapsedView: true,
      isOverrideConfirmation: {
        isOverride: false,
        count: 0
      }
    } as CalendarState
  }

  getAvailibilityData = () => {
    const availabilities = this.props.availabilities
    this.setState({
      availabilities
    })
  }

  getAvailibilityRangeData = () => {
    let startDate: any
    let endDate: any

    const availabilityType = this.props.availabilityType
    if (availabilityType === availabilityTypes.Rolling) {
      startDate = moment().format('YYYY-MM-DD')
      endDate = moment()
        .add(this.props.availabilityRolling, 'days')
        .format('YYYY-MM-DD')
    } else if (availabilityType === availabilityTypes.Range) {
      startDate = moment(this.props.availabilityStartDate, 'YYYY-MM-DD').format(
        'YYYY-MM-DD'
      )
      endDate = moment(this.props.availabilityEndDate, 'YYYY-MM-DD').format(
        'YYYY-MM-DD'
      )
    } else {
      startDate = moment().format('YYYY-MM-DD')
      endDate = moment().add(100, 'years').format('YYYY-MM-DD')
    }

    const availibilityRangeData = {
      startDate: startDate,
      endDate: endDate
    }

    this.setState({
      availibilityRangeData
    })
  }

  onHandleClickNext = () => {
    this.setState({
      date: moment(this.state.date)
        .add(this.state.numRowsRender * 7, 'days')
        .toDate()
    })
  }

  onHandleClickPrev = () => {
    const date = moment(this.state.date)
      .subtract(this.state.numRowsRender * 7, 'days')
      .toDate()
    const isBefore = moment().endOf('week').isBefore(moment(this.state.date))
    if (isBefore) {
      this.setState({
        date
      })
    }
  }

  getDateRangLabel = () => {
    const startDate = moment(this.state.date).startOf('week')
    const endDate = moment(startDate).add(
      this.state.numRowsRender * 7 - 1,
      'days'
    )

    return getDateRangeTitle(startDate, endDate)
  }

  onDayClick = (day: any) => {
    const intervals: any = []
    let data = this.state.availabilities.filter(
      (item: any) => item.day === moment(day).format('YYYY-MM-DD')
    )
    if (data.length === 0) {
      data = this.state.availabilities.filter(
        (item: any) => item.day === moment(day).format('ddd').toLowerCase()
      )
    }

    if (data.length !== 0) {
      data[0].slots.forEach((item: any) => {
        const interval = {
          from: item.from,
          to: item.to
        }

        intervals.push(interval)
      })
    } else {
      const interval = {
        from: '',
        to: ''
      }

      intervals.push(interval)
    }
    this.setState({
      selectedDay: day,
      isAvailabilityModal: true,
      availabilityIntervals: intervals
    })
  }

  onModalClose = () => {
    this.state.isAvailabilityModal &&
      this.setState({
        isAvailabilityModal: false
      })
  }

  onShowMore = () => {
    this.setState({
      numRowsRender: this.props.totalNumOfRows ? this.props.totalNumOfRows : 5,
      isCollapsedView: false
    })
  }

  onTodayClick = () => {
    this.setState({
      date: moment().startOf('week').toDate()
    })
  }

  onIntervalChange = (value: Availabilities[]) => {
    const slots = this.state.availabilities.filter(
      (time: Availabilities) => time.day === value[0].day
    )
    if (
      slots !== [] ||
      JSON.stringify(slots[0].slots) !== JSON.stringify(value[0].slots)
    ) {
      let availabilites: Availabilities[] = this.state.availabilities
      value.forEach((slot: Availabilities) => {
        availabilites = availabilites.filter(
          (item: Availabilities) => item.day !== slot.day
        )
      })
      const data = [...value, ...availabilites]
      this.props.onIntervalChange(data)
    }
  }

  getOverridingData = (value: Availabilities[]) => {
    const availabilites: Availabilities[] = this.state.availabilities
    let isOverrided: boolean = false
    const overridedValues: Availabilities[] = []
    let count: number = 0
    const day: string = moment(value[0].day, 'ddd').format('dddd')
    availabilites.forEach((item: Availabilities) => {
      const isOverride =
        moment(item.day, 'YYYY-MM-DD').format('ddd').toLowerCase() ===
          value[0].day &&
        moment(item.day, 'YYYY-MM-DD').isAfter(moment().subtract(1, 'day'))
      if (isOverride) {
        isOverrided = true
        count = count + 1
        overridedValues.push(item)
      }
    })
    if (
      isOverrided &&
      !(
        count === 1 &&
        moment(this.state.selectedDay).format('YYYY-MM-DD') ===
          overridedValues[0].day
      )
    ) {
      this.setState({
        isOverrideConfirmation: {
          isOverride: true,
          count,
          day: day,
          overridedValues,
          currentValue: value
        }
      })
    } else {
      this.onIntervalChange(value)
    }
  }

  onFormSubmit = (value: Availabilities[], period: PeriodsOfDay) => {
    if (period === PeriodsOfDay.ALL) {
      this.getOverridingData(value)
    } else {
      this.onIntervalChange(value)
    }
    this.setState({
      isAvailabilityModal: false
    })
  }

  onOverrideSubmit = (value: boolean) => {
    if (!value) {
      this.onIntervalChange(this.state.isOverrideConfirmation.currentValue)
    } else {
      let availabilites: Availabilities[] = this.state.availabilities.filter(
        (item: Availabilities) =>
          item.day !== this.state.isOverrideConfirmation.currentValue[0].day
      )
      this.state.isOverrideConfirmation.overridedValues.forEach(
        (item: Availabilities) => {
          const data: Availabilities[] = []
          availabilites.forEach((availability: Availabilities) => {
            if (item.day !== availability.day) {
              data.push(availability)
            }
          })
          availabilites = data
        }
      )
      const data = [
        ...availabilites,
        ...this.state.isOverrideConfirmation.currentValue
      ]
      this.props.onIntervalChange(data)
    }
    this.setState({
      isOverrideConfirmation: {
        isOverride: false,
        count: 0,
        day: '',
        overridedValues: [],
        currentValue: []
      }
    })
  }

  componentDidMount() {
    this.getAvailibilityRangeData()
    this.getAvailibilityData()
  }

  componentDidUpdate(prevProps: CalendarProps) {
    const current = JSON.stringify(this.props.availabilities)
    const prev = JSON.stringify(prevProps.availabilities)
    if (current !== prev) {
      this.getAvailibilityData()
    }

    const propChanges =
      this.props.availabilityType !== prevProps.availabilityType ||
      this.props.availabilityStartDate !== prevProps.availabilityStartDate ||
      this.props.availabilityEndDate !== prevProps.availabilityEndDate ||
      this.props.availabilityRolling !== prevProps.availabilityRolling
    if (propChanges) {
      this.getAvailibilityRangeData()
    }
  }

  render() {
    const {
      isAvailabilityModal,
      selectedDay,
      numRowsRender,
      date,
      availibilityRangeData
    } = this.state
    const {
      initialRenderOfRows,
      className,
      tableContainerStyle,
      dayConstainerStyle,
      dayTextStyle,
      intervalsWrapStyle,
      is24hour
    } = this.props
    const initialRendersOfRow: number = initialRenderOfRows
      ? initialRenderOfRows + 1
      : 4
    const intervalDetails = {
      day: selectedDay,
      duration: this.props.duration
    }
    const isToday =
      moment(date).format('DD-MM-YYYY') !==
      moment().startOf('week').format('DD-MM-YYYY')
    return (
      <div className={clsx(className, styles.container)}>
        <TopHeader
          dateRange={this.getDateRangLabel()}
          onNext={this.onHandleClickNext}
          onPrev={this.onHandleClickPrev}
          onTodayClick={this.onTodayClick}
          isToday={isToday}
          isBefore={moment().endOf('week').isBefore(moment(this.state.date))}
        />
        <div style={{ position: 'relative' }} className={tableContainerStyle}>
          <table className={styles.table}>
            <tbody>
              <TableHeader />
              <TableContent
                date={this.state.date}
                onDayClick={this.onDayClick}
                numRowsRender={numRowsRender}
                availibilityRangeData={availibilityRangeData}
                availabilityData={this.state.availabilities}
                isCollapsed={this.state.isCollapsedView}
                dayConstainerStyle={dayConstainerStyle}
                dayTextStyle={dayTextStyle}
                intervalsWrapStyle={intervalsWrapStyle}
                is24hour={is24hour}
              />
            </tbody>
          </table>
          {numRowsRender === initialRendersOfRow ? (
            <div className={styles.showMore}>
              <div className={styles.showMoreWrap} onClick={this.onShowMore}>
                show more
                <span className={styles.showMoreSvgWrap}>
                  <ArrowLeftIcon className={styles.showMoreSvg} />
                </span>
              </div>
            </div>
          ) : undefined}
        </div>
        <ViewModal
          visible={isAvailabilityModal}
          onClose={this.onModalClose}
          intervalDetails={intervalDetails}
          formValues={this.state.availabilityIntervals}
          onFormSubmit={this.onFormSubmit}
          is24hour={is24hour}
        />
        <OverrideConfirmationDialog
          visible={this.state.isOverrideConfirmation.isOverride}
          onSubmit={this.onOverrideSubmit}
          count={this.state.isOverrideConfirmation.count}
          day={this.state.isOverrideConfirmation.day}
        />
      </div>
    )
  }
}
