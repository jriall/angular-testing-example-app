import {Pipe, PipeTransform} from '@angular/core';
import {map} from 'rxjs/operators';

export enum MonthFormat {
  LONG = 'long',
  SHORT = 'short',
}

const longMonthMap = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

const shortMonthMap = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sept',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
}

@Pipe({name: 'releaseDate'})
export class ReleaseDatePipe implements PipeTransform {
  transform(releaseDate: string, monthFormat = MonthFormat.LONG) {
    const [year, month, date] =
        releaseDate.split('-').map(number => Math.abs(+number).toString());

    const monthFormatted = monthFormat === MonthFormat.LONG ?
        longMonthMap[month] :
        shortMonthMap[month];

    return `${date} ${monthFormatted}, ${year}`;
  }
}
