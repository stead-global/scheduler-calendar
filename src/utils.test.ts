/**
 * @author Azad Mohamed
 * @file Test files
 */

import { getTimeFromText } from './Utils'

describe('getTimeFromText', () => {
  it('should convert dot format to colon format', () => {
    const duration = getTimeFromText('1.1a', false)
    expect(duration).toEqual('01:01 am')

    const duration2 = getTimeFromText('2.2p', false)
    expect(duration2).toEqual('02:02 pm')

    const duration3 = getTimeFromText('2.2', false)
    expect(duration3).toEqual('02:02 am')

    const duration4 = getTimeFromText('1.1a', true)
    expect(duration4).toEqual('01:01')

    const duration5 = getTimeFromText('2.2p', true)
    expect(duration5).toEqual('02:02')

    const duration6 = getTimeFromText('2.2', true)
    expect(duration6).toEqual('02:02')
  })
  it('should convert 12:00 am if unformatted characters', () => {
    const duration = getTimeFromText('999999', false)
    expect(duration).toEqual('12:00 am')

    const duration2 = getTimeFromText('abc', false)
    expect(duration2).toEqual('12:00 am')

    const duration3 = getTimeFromText('1234', false)
    expect(duration3).toEqual('12:34 am')

    const duration4 = getTimeFromText('999999', true)
    expect(duration4).toEqual('00:00')

    const duration5 = getTimeFromText('abc', true)
    expect(duration5).toEqual('00:00')

    const duration6 = getTimeFromText('1234', true)
    expect(duration6).toEqual('12:34')
  })
})
