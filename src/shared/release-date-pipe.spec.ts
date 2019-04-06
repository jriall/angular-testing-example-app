import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {MonthFormat, ReleaseDatePipe} from './release-date-pipe';

describe('The release date pipe', () => {
  const releaseDatePipe = new ReleaseDatePipe();

  it('should format with a long month format by default', () => {
    expect(releaseDatePipe.transform('2017-11-11')).toBe('11 November, 2017');
  });

  it('should format the date correctly when the user specifies a short month ' +
         'format',
     () => {
       expect(releaseDatePipe.transform('2017-11-11', MonthFormat.SHORT))
           .toBe('11 Nov, 2017');
     });

  it('correctly strips any leading zeros from the months and days', () => {
    expect(releaseDatePipe.transform('2017-01-03')).toBe('3 January, 2017');
  });
});
