import React from 'react'
import styles from './WeekCalendar.module.css'
import moment from 'moment'
import clsx from 'clsx'
// eslint-disable-next-line no-unused-vars
import { AvailibilityRangeData, Availabilities } from '../../Interfaces'
import { getMidDayTime } from '../../Utils'

interface Props {
  date: Date
  onDayClick: (day: any) => void
  numRowsRender: number
  availabilityData: Availabilities[]
  isCollapsed?: boolean
  dayTextStyle?: string
  dayConstainerStyle?: string
  intervalsWrapStyle?: string
  is24hour: boolean
  availibilityRangeData: AvailibilityRangeData
  isBusinessDays: boolean
  isPastAvailabilityLocked: boolean
}

interface State {}

export default class WeekCalendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {} as State
  }

  _renderCalendar = () => {
    const { date } = this.props
    let i = 0

    const currDayInMonth = moment(date).startOf('week')

    const daysElementArray = []

    while (i < 7) {
      i++
      daysElementArray.push(
        <tr key={currDayInMonth.format()}>
          {this._renderByDay(currDayInMonth)}
        </tr>
      )
    }

    return daysElementArray
  }

  timeInterval = (date: any) => {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    const formattedDay = moment(date).format('ddd').toLowerCase()
    const renderTimes: any = []

    const renderIntervals = (item: any) => {
      const returnInterval: any = []
      let intervalCount: number = 0
      const numOfInterval = 2
      item.every((interval: any, index: number) => {
        intervalCount++
        if (intervalCount <= numOfInterval) {
          if (interval.from && interval.to) {
            const startTime = !this.props.is24hour
              ? getMidDayTime(interval.from)
              : interval.from
            const endTime = !this.props.is24hour
              ? getMidDayTime(interval.to)
              : interval.to
            returnInterval.push(
              <span
                key={'time' + index}
                className={clsx(
                  styles.intervalBlock,
                  this.props.intervalsWrapStyle
                )}
              >{`${startTime} - ${endTime}`}</span>
            )
          } else {
            returnInterval.push('')
          }

          return true
        } else {
          returnInterval.push(
            <span
              key={item.length + 'more'}
              className={styles.intervalMoreBlock}
            >{`+${item.length - numOfInterval} more`}</span>
          )
          return false
        }
      })
      return returnInterval
    }
    let interval: any = []
    // eslint-disable-next-line no-unused-expressions
    this.props.availabilityData?.every((item: any) => {
      const day = moment(item.day).format('YYYY-MM-DD')
      if (day === formattedDate) {
        interval = []
        interval.push(item.slots)
        return false
      } else if (item.day === formattedDay) {
        interval.push(item.slots)
        return true
      } else {
        return true
      }
    })
    // eslint-disable-next-line no-unused-expressions
    interval?.forEach((item: any, index: number) => {
      renderTimes.push(
        <span key={'wrap' + index}>{renderIntervals(item)}</span>
      )
    })
    return renderTimes
  }

  _renderByDay = (currDayInMonth: any) => {
    const daysToRender = []

    const dayIntervalData = this.timeInterval(currDayInMonth.format())
    const isToday = currDayInMonth.diff(moment().startOf('day'), 'days') === 0
    const isDisabled =
      !moment(currDayInMonth).isSameOrBefore(
        this.props.availibilityRangeData?.endDate,
        'day'
      ) ||
      (moment(currDayInMonth).isBefore(moment(), 'day') &&
        currDayInMonth.format('DDMMYY') !== moment().format('DDMMYY')) ||
      !moment(currDayInMonth).isSameOrAfter(
        this.props.availibilityRangeData?.startDate,
        'day'
      ) ||
      (this.props.isBusinessDays &&
        (currDayInMonth.toDate().getDay() === 0 ||
          currDayInMonth.toDate().getDay() === 6))
        ? styles.disabledDay
        : undefined
    const currDay = moment(currDayInMonth).format()
    const isClickable = !this.props.isPastAvailabilityLocked || !isDisabled
    const handleOnDayClick = () => {
      if (isClickable) {
        this.props.onDayClick(currDay)
      }
    }
    daysToRender.push(
      <td
        key={currDayInMonth.format('DDMMYY')}
        className={clsx(
          styles.td,
          isDisabled,
          this.props.dayConstainerStyle,
          this.props.isPastAvailabilityLocked && isDisabled
            ? styles.blockClickEvents
            : ''
        )}
        onClick={handleOnDayClick}
      >
        <div className={styles.dayWrapper}>
          <span className={styles.weekDayWrap}>
            {currDayInMonth.format('ddd')}
          </span>
          <div className={styles.intervalsWrap}>{dayIntervalData}</div>
          <span className={clsx(styles.dayNumber, this.props.dayTextStyle)}>
            {isToday
              ? 'Today'
              : currDayInMonth.format('D') === '1'
              ? currDayInMonth.format('MMM D')
              : currDayInMonth.format('D')}
          </span>
        </div>
      </td>
    )

    currDayInMonth.add(1, 'days')

    return daysToRender
  }

  render() {
    return <React.Fragment>{this._renderCalendar()}</React.Fragment>
  }
}
