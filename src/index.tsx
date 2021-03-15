import React from 'react'
import './index.css'
import Calendar from './Components/Calendar/Calendar'
// eslint-disable-next-line no-unused-vars
import { Availabilities } from './Interfaces'
// eslint-disable-next-line no-unused-vars
import moment, { Moment } from 'moment'

interface Props {
  availabilityType: 'rolling' | 'range' | 'infinity' | string
  availabilityEndDate?: Moment
  availabilityStartDate?: Moment
  availabilityRolling?: number
  duration: number
  availabilities: Availabilities[]
  onIntervalChange: (value: any) => void
  className?: string
  initialRenderOfRows?: number
  totalNumOfRows?: number
  tableContainerStyle?: string
  dayTextStyle?: string
  dayContainerStyle?: string
  intervalsWrapStyle?: string
  topHeaderContainerStyle?: string
  topHeaderTitleStyle?: string
  is24hour?: boolean
  isBusinessDays?: boolean
  isDisabledDateLocked?: boolean
  stylesOfDay?: (day: string, available: boolean, isRolling: boolean) => object
  intervalStyles?: object
  customHeaderComponent?: (dateRange: string) => void;
  inputRef?: (ref: any) => void;
}

export default function SchedulerCalendar(props: Props) {
  const {
    availabilityType = 'rolling',
    availabilityStartDate,
    availabilityEndDate,
    availabilityRolling = 60,
    isBusinessDays = false,
    duration,
    onIntervalChange,
    className,
    initialRenderOfRows,
    totalNumOfRows,
    tableContainerStyle,
    dayContainerStyle,
    dayTextStyle,
    intervalsWrapStyle,
    is24hour = false,
    topHeaderContainerStyle,
    topHeaderTitleStyle,
    isDisabledDateLocked = false,
    stylesOfDay,
    intervalStyles,
    customHeaderComponent,
    inputRef,
  } = props

  const [availabilitiesData, setAvailabilitiesData] = React.useState(
    props.availabilities
  )

  React.useEffect(() => {
    setAvailabilitiesData(JSON.parse(JSON.stringify(props.availabilities)))
  }, [props.availabilities])

  return (
    <Calendar
      ref={ref => inputRef ? inputRef(ref) : ''}
      availabilities={availabilitiesData}
      availabilityType={availabilityType}
      availabilityEndDate={moment(availabilityEndDate).format('YYYY-MM-DD')}
      availabilityStartDate={moment(availabilityStartDate).format('YYYY-MM-DD')}
      availabilityRolling={availabilityRolling}
      duration={duration}
      onIntervalChange={onIntervalChange}
      className={className}
      initialRenderOfRows={initialRenderOfRows}
      totalNumOfRows={totalNumOfRows}
      tableContainerStyle={tableContainerStyle}
      dayContainerStyle={dayContainerStyle}
      dayTextStyle={dayTextStyle}
      intervalsWrapStyle={intervalsWrapStyle}
      topHeaderContainerStyle={topHeaderContainerStyle}
      topHeaderTitleStyle={topHeaderTitleStyle}
      is24hour={is24hour}
      isBusinessDays={isBusinessDays}
      isDisabledDateLocked={isDisabledDateLocked}
      stylesOfDay={stylesOfDay}
      intervalStyles={intervalStyles}
      customHeaderComponent={customHeaderComponent}
    />
  )
}
