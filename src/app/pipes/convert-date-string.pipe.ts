import { Pipe, PipeTransform } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';

@Pipe({
  name: 'convertDateString'
})
export class ConvertDateStringPipe implements PipeTransform {

  transform(date?: dayjs.ConfigType, format: string = "DD-MM-YYYY"): unknown {
    return dayjs(date).format(format);
  }

}
