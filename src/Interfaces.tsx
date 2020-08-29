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
