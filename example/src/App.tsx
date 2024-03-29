import SchedulerCalendar from 'scheduler-calendar'
import 'scheduler-calendar/dist/index.css'
import Styles from './App.css.js'
import moment from 'moment'

const App = () => {
  const stylesOfDay = (day: string, isAvailable: boolean, isRolling?: boolean ) => {
    if(!isRolling)
      return Styles.disabledContainer
    if(moment(day).weekday() === 0)
      return {...Styles.container ,...Styles.sundayContainer}
    if(isAvailable)
      return {...Styles.container ,...Styles.availableContainer};
    else
      return {...Styles.container ,...Styles.emptyContainer};
  }
  return (
    <SchedulerCalendar
      availabilities={[
        {
          day: 'mon',
          slots: [
            { from: '09:00', to: '10:30' },
            { from: '11:30', to: '13:00' },
            { from: '14:30', to: '17:00' }
          ],
          comment: 'Test comment'
        },
        {
          day: '2021-01-26',
          slots: [
            { from: '09:00', to: '10:30' },
            { from: '11:30', to: '19:00' }
          ]
        }
      ]}
      availabilityType={'infinity'}
      duration={10}
      onIntervalChange={() => {}}
      stylesOfDay={stylesOfDay}
      intervalStyles={Styles.intervals}
      isCommentEnabled={true}
    />
  )
}

export default App
