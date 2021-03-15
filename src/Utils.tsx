import moment from 'moment'

export function getDateRangeTitle(start: any, end: any) {
  const startDate: any = start
  const endDate: any = end
  const startDay = moment(startDate).format('D')
  const endDay = moment(endDate).format('D')
  const startMonth = moment(startDate).format('MMM')
  const endMonth = moment(endDate).format('MMM')
  const startYear = moment(startDate).format('YYYY')
  const endYear = moment(endDate).format('YYYY')
  const currentYear = moment().format('YYYY')

  return `${startDay} ${(startMonth !== endMonth) || (currentYear !== startYear) ? startMonth : ''} ${
    startYear !== currentYear ? startYear : ''
  } - ${endDay} ${endMonth} ${endYear}`
}

export function getMidDayTime(time: string) {
  const midDay = moment(time, 'HH:mm').format('a')
  const times = moment(time, 'HH:mm').format('h:mm')
  if (midDay === 'am') {
    return `${times} a`
  } else {
    return `${times} p`
  }
}

export function getTimeFromText(value: string, is24hour: boolean): string {
  try {
    if (!value) return ''

    const spaceSplit = value.split(' ')
    const colonSplit = value.split(':')
    const dotSplit = value.split('.')
    const slashSplit = value.split('/')
    let values: any = []
    let hours: string = '12'
    let mins: string = '00'
    let midDay: string = 'am'

    switch (true) {
      case colonSplit.length > 1:
        values = colonSplit
        break
      case dotSplit.length > 1:
        values = dotSplit
        break
      case value.split('-').length > 1:
        values = value.split('-')
        break
      case slashSplit.length > 1:
        values = slashSplit
        break
      case value.split(',').length > 1:
        values = value.split(',')
        break
      case spaceSplit.length > 1:
        values = spaceSplit
        break
      case value.split('`').length > 1:
        values = value.split('`')
        break
      case value.split(`'`).length > 1:
        values = value.split(`'`)
        break
      default:
        // eslint-disable-next-line no-case-declarations
        const splits = value.replace(/[^0-9]/g, '').split('')
        values[0] = `${splits[0]}${splits[1]}`
        values[1] = `${splits[2]}${splits[3]}`
    }

    hours = values[0].replace(/[^0-9]/g, '')
    mins = values[1].replace(/[^0-9]/g, '')

    const midDaySplit = value.replace(/[^a-z]/gi, '').split('')

    if (mins.length > 2) {
      mins = mins.substring(0, 2)
    }

    midDaySplit.every((char: string) => {
      if (char === 'a' || char === 'A') {
        midDay = 'am'
        return false
      }
      if (char === 'p' || char === 'P') {
        midDay = 'pm'
        return false
      }

      return true
    })

    if (Number(mins) > 59) {
      hours = is24hour ? '00' : '12'
      mins = '00'
      midDay = 'am'
    }

    if (Number(hours) > 12 && Number(hours) < 24 && !is24hour) {
      hours = `${Number(hours) - 12}`
      midDay = 'pm'
    }
    if (Number(hours) >= 24) {
      hours = is24hour ? '00' : '12'
      mins = '00'
      midDay = 'am'
    }

    if (!hours) {
      hours = is24hour ? '00' : '12'
    }

    if (!mins) {
      mins = '00'
    }

    if (!is24hour && Number(hours) === 0) {
      hours = '12'
    }

    if (is24hour) {
      return `${hours.length === 1 ? `0${hours}` : `${hours}`}:${
        mins.length === 1 ? `0${mins}` : mins
      }`
    }
    return `${hours.length === 1 ? `0${hours}` : hours}:${
      mins.length === 1 ? `0${mins}` : mins
    } ${midDay}`
  } catch (error) {
    return ''
  }
}
