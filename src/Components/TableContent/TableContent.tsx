import React from 'react'
import styles from './TableContent.module.css'
import moment from 'moment'
import clsx from 'clsx'
// eslint-disable-next-line no-unused-vars
import { AvailibilityRangeData } from '../../Interfaces'
import { getMidDayTime } from '../../Utils'

interface Props {
  date: Date
  onDayClick: (day: any) => void
  numRowsRender: number
  availabilityData: any
  isCollapsed?: boolean
  dayTextStyle?: string
  dayConstainerStyle?: string
  intervalsWrapStyle?: string
  is24hour: boolean
  availibilityRangeData: AvailibilityRangeData
}

interface State {}

export default class TableContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {} as State
  }

  _renderCalendar = () => {
    const { date } = this.props
    let i = 0

    const currDayInMonth = moment(date).startOf('week')

    const daysElementArray = []

    while (i < this.props.numRowsRender) {
      i++
      daysElementArray.push(
        <tr key={currDayInMonth.format()}>
          {this._renderByWeek(currDayInMonth, i)}
        </tr>
      )
    }

    return daysElementArray
  }

  timeInterval = (date: any, rowNum: number) => {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    const formattedDay = moment(date).format('ddd').toLowerCase()
    const renderTimes: any = []

    const renderIntervals = (item: any) => {
      const returnInterval: any = []
      let intervalCount: number = 0
      const numOfInterval =
        this.props.numRowsRender === rowNum && this.props.isCollapsed ? 1 : 2
      item.every((interval: any, index: number) => {
        intervalCount++
        if (intervalCount <= numOfInterval) {
          const startTime = !this.props.is24hour
            ? getMidDayTime(interval.startTime)
            : interval.startTime
          // const endTime = this.getMidDayTime(moment(item, 'HH:mm').add(this.props.availabilityData?.service.duration, 'mm').format('HH:mm'));
          const endTime = !this.props.is24hour
            ? getMidDayTime(interval.endTime)
            : interval.endTime
          returnInterval.push(
            <span
              key={'time' + index}
              className={clsx(
                styles.intervalBlock,
                this.props.intervalsWrapStyle
              )}
            >{`${startTime} - ${endTime}`}</span>
          )

          if (this.props.numRowsRender === rowNum && this.props.isCollapsed) {
            return false
          } else {
            return true
          }
        } else {
          returnInterval.push(
            <span className={styles.intervalMoreBlock}>{`+${
              item.length - numOfInterval
            } more`}</span>
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
        <span style={{ marginTop: 16 }} key={'wrap' + index}>
          {renderIntervals(item)}
        </span>
      )
      // }
    })
    return renderTimes
  }

  _renderByWeek = (currDayInMonth: any, rowNum: number) => {
    const daysToRender = []

    // Days rendered in a week must be at least 1, and we want to stop on the next sunday
    // Also, we want to make sure that we don't overshoot to the next month
    while (daysToRender.length === 0 || currDayInMonth.isoWeekday() % 7 !== 0) {
      const dayIntervalData = this.timeInterval(currDayInMonth.format(), rowNum)
      const isToday = currDayInMonth.diff(moment().startOf('day'), 'days') === 0
      const isDisabled =
        !moment(currDayInMonth).isSameOrBefore(
          this.props.availibilityRangeData?.endDate,
          'day'
        ) ||
        (moment(currDayInMonth).isBefore(moment()) &&
          currDayInMonth.format('DDMMYY') !== moment().format('DDMMYY'))
          ? styles.disabledDay
          : undefined
      const currDay = moment(currDayInMonth).format()

      daysToRender.push(
        <td
          key={currDayInMonth.format('DDMMYY')}
          className={clsx(
            styles.td,
            isDisabled,
            this.props.numRowsRender === rowNum && this.props.isCollapsed
              ? styles.lastWrap
              : '',
            this.props.dayConstainerStyle
          )}
          onClick={() => {
            this.props.onDayClick(currDay)
          }}
        >
          <div className={styles.dayWrapper}>
            <span className={clsx(styles.dayNumber, this.props.dayTextStyle)}>
              {isToday
                ? 'Today'
                : currDayInMonth.format('D') === '1'
                ? currDayInMonth.format('MMM D')
                : currDayInMonth.format('D')}
            </span>
            <div className={styles.intervalsWrap}>{dayIntervalData}</div>
          </div>
        </td>
      )

      currDayInMonth.add(1, 'days')
    }

    return daysToRender
  }

  render() {
    return <React.Fragment>{this._renderCalendar()}</React.Fragment>
  }
}
