# scheduler-calendar

> Scheduler Calendar Component for React Js

<img width="1172" alt="demo" src="https://user-images.githubusercontent.com/42475339/103169405-5335e280-4861-11eb-8835-f10f9c163084.png">

<img width="755" alt="model" src="https://user-images.githubusercontent.com/42475339/103169413-6c3e9380-4861-11eb-8d62-5f92f3337a98.png">

<img width="727" alt="multiple" src="https://user-images.githubusercontent.com/42475339/103169422-7cef0980-4861-11eb-9cbc-fc6463f9ca28.png">

<img width="580" alt="responsive" src="https://user-images.githubusercontent.com/42475339/103169435-9001d980-4861-11eb-8570-0935986db9af.png">


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
    return <SchedulerCalendar
            availabilities={[{day: "mon", "slots": [{from: "11:00", to: "13:00"}]}, {day: "20/12/2020", "slots": [  {from: "11:00", to: "13:00"}]}]}
            availabilityType={'rolling'}
            duration={0}
            onIntervalChange={() => {}}
          />
  }
}
```

## SchedulerCalendar Props

| Prop                        | Type       | Description                                                                           |
| :-------------------------- | :--------- | :------------------------------------------------------------------------------------ |
| **`availabilities`**        | `Array`    | List of availabilities. Eg. `[{day: "mon", "slots": [{from: "11:00", to: "13:00"}]}]` |
| **`duration`**              | `number`   | Minimum duration of time interval                                                     |
| **`onIntervalChange`**      | `Function` | Callback when a interval is updated and it's contains the array of updated values     |
| **`availabilityType`**      | `string`   | values must be `one of rolling (for number of days) or range or infinity`                                  |
| **`availabilityEndDate`**   | `Moment`   | end of date range when availability type is 'range'                                   |
| **`availabilityStartDate`** | `Moment`   | start of date range when availability type is 'range'                                 |
| **`availabilityRolling`**   | `number`   | number of rolling days when availability type is 'rolling'                            |
| **`initialRenderOfRows`**   | `number`   | Optional. number of rows to render at initial                                         |
| **`totalNumOfRows`**        | `number`   | Optional. total number of rows for calendar                                           |
| **`tableContainerStyle`**   | `string`   | Optional. to style calendar                                                           |
| **`dayConstainerStyle`**    | `string`   | Optional. to style each cell of calendar                                              |
| **`dayTextStyle`**          | `string`   | Optional. to style day text                                                           |
| **`intervalsWrapStyle`**    | `string`   | Optional. to style wrapper of interval shown in calendar                              |
| **`is24hour`**              | `boolean`  | Optional. true if time in 24 hours                                                    |
| **`topHeaderStyle`**        | `string`   | Optional. to style header container                                                   |
| **`isBusinessDays`**        | `boolean`  | Optional. to avoid sundays and saturdays in rolling days                              |

## License

MIT © [azadhmhd](https://github.com/azadhmhd)
