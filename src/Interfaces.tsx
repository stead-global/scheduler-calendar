export interface Availabilities {
  day: string
  slots: AvailabilityIntervals[]
}

export interface ServiceType {
  availabilityEnd: string
  availabilityRolling: number
  availabilityStart: string
  availabilityType: 'rolling' | 'infinity' | 'range' | string
  duration: number
  name: string
}

export interface ServiceDataType {
  service: ServiceType
  availabilities: Availabilities[]
}

export interface AvailabilityIntervals {
  from: string
  to: string
}

export interface AvailibilityRangeData {
  startDate: string
  endDate: string
}

export interface CalendarProps {
  availabilityType: string;
  availabilityEndDate?: string;
  availabilityStartDate?: string;
  availabilityRolling?: number;
  duration: number;
  availabilities: Availabilities[];
  onIntervalChange: (value: Availabilities[]) => void;
  className?: string;
  initialRenderOfRows?: number;
  totalNumOfRows?: number;
  tableContainerStyle?: string;
  dayTextStyle?: string;
  dayContainerStyle?: string;
  intervalsWrapStyle?: string;
  topHeaderContainerStyle?: string;
  topHeaderTitleStyle?: string;
  is24hour: boolean;
  isBusinessDays: boolean;
  isDisabledDateLocked: boolean;
  stylesOfDay?: (day: string, available: boolean, isRolling: boolean) => object;
  intervalStyles?: object;
  customHeaderComponent?: (dateRange: string) => void;
}