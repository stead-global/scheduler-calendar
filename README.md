# scheduler-calendar

> Scheduler Calendar Component for React Js

[![NPM](https://img.shields.io/npm/v/scheduler-calendar.svg)](https://www.npmjs.com/package/scheduler-calendar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

To use the calendar you just need to:

```bash
npm install --save scheduler-calendar
```

## Usage

```tsx
import React, { Component } from 'react'

import SchedulerCalendar from 'scheduler-calendar'
import 'scheduler-calendar/dist/index.css'

class Example extends Component {
  render() {
    return (
      <SchedulerCalendar
              availabilities={[
                {
                  day: "mon",
                  slots: [
                    {from: '09:00', to: '10:30'},
                    {from: '11:30', to: '13:00'},
                    {from: '14:30', to: '17:00'},
                  ]
                },
                {
                  day: "2021-01-26",
                  slots: [
                    {from: '09:00', to: '10:30'},
                    {from: '11:30', to: '19:00'},
                  ]
                },
              ]}
              availabilityType={'infinity'}
              duration={10}
              onIntervalChange={() => {}}
            />
    )
  }
}
```

## SchedulerCalendar Props

| Prop                           | Type       | Description                                                                           |
| :----------------------------- | :--------- | :------------------------------------------------------------------------------------ |
| **`availabilities`**           | `Array`    | List of availabilities. Eg. `[{day: "mon", "slots": [{from: "11:00", to: "13:00"}]}]` |
| **`duration`**                 | `number`   | Minimum duration of time interval                                                     |
| **`onIntervalChange`**         | `Function` | Callback when a interval is updated and it's contains the array of updated values     |
| **`availabilityType`**         | `string`   | values must be `one of rolling (for number of days) or range or infinity`             |
| **`availabilityEndDate`**      | `Moment`   | end of date range when availability type is 'range'                                   |
| **`availabilityStartDate`**    | `Moment`   | start of date range when availability type is 'range'                                 |
| **`availabilityRolling`**      | `number`   | number of rolling days when availability type is 'rolling'                            |
| **`initialRenderOfRows`**      | `number`   | Optional. number of rows to render at initial                                         |
| **`totalNumOfRows`**           | `number`   | Optional. total number of rows for calendar                                           |
| **`tableContainerStyle`**      | `string`   | Optional. to style calendar                                                           |
| **`dayContainerStyle`**       | `string`   | Optional. to style each cell of calendar                                              |
| **`dayTextStyle`**             | `string`   | Optional. to style day text                                                           |
| **`intervalsWrapStyle`**       | `string`   | Optional. to style wrapper of interval shown in calendar                              |
| **`is24hour`**                 | `boolean`  | Optional. true if time in 24 hours                                                    |
| **`topHeaderStyle`**           | `string`   | Optional. to style header container                                                   |
| **`isBusinessDays`**           | `boolean`  | Optional. to avoid sundays and saturdays in rolling days                              |
| **`isDisabledDateLocked`** | `boolean`  | Optional. to turn off changing the availability for past date                         |
| **`stylesOfDay`** | `Function`  | Optional. Callback with 3 parameters ( day: Date, isAvailable: Boolean, isRolling: Boolean ) for conditional styling                             |
| **`intervalStyles`** | `Object`  | Optional. To style each intervals inside a cell                            |
| **`customHeaderComponent`**           | `Function`    | Function to return custom header |
| **`inputRef`**           | `any`    | Ref object |

## Screenshots

<img width="1680" alt="Screenshot 2021-03-15 at 7 05 15 PM" src="https://user-images.githubusercontent.com/42475339/111161800-86b31e00-85c1-11eb-9915-d057f1203c77.png">

<img width="1680" alt="Screenshot 2021-03-15 at 7 05 25 PM" src="https://user-images.githubusercontent.com/42475339/111162058-c7129c00-85c1-11eb-9d4f-abe830d8f8e8.png">

<img width="1680" alt="Screenshot 2021-03-15 at 7 05 38 PM" src="https://user-images.githubusercontent.com/42475339/111162101-d72a7b80-85c1-11eb-9a07-d58ac16f88d3.png">

## Authors

* [azadhmhd](https://github.com/azadhmhd)

## License

MIT © Stead https://github.com/stead-global
