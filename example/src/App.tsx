import React from 'react'

import SchedulerCalendar from 'scheduler-calendar'
import 'scheduler-calendar/dist/index.css'

const App = () => {
  return (
    <SchedulerCalendar
      availabilities={[]}
      availabilityType={''}
      duration={0}
      onIntervalChange={() => {}}
    />
  )
}

export default App
