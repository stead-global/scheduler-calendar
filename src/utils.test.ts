/**
 * @author Azad Mohamed
 * @file Test files
 */

import {getTimeFromText} from './Utils';

describe('getTimeFromText', () => {

    it('should convert dot format to colon format', () => {
        const duration = getTimeFromText('1.1a');
        expect(duration).toEqual('01:01 am');

        const duration2 = getTimeFromText('2.2p');
        expect(duration2).toEqual('02:02 pm');

        const duration3 = getTimeFromText('2.2');
        expect(duration3).toEqual('02:02 am');
    });
    it('should convert 12:00 am if unformatted characters', () => {
        const duration = getTimeFromText('999999');
        expect(duration).toEqual('12:00 am');

        const duration2 = getTimeFromText('abc');
        expect(duration2).toEqual('12:00 am');

        const duration3 = getTimeFromText('1234');
        expect(duration3).toEqual('12:34 am');
    });
})
