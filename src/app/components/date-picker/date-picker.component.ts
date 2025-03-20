import { AfterViewInit, Component, inject, input, OnInit, output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n'

@Component({
  selector: 'app-date-picker',
  imports: [NzDatePickerModule, FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  // props
  date = input<Date>(new Date());
  dateFormat: string = 'dd-MM-yyyy';
  dateChangeEventEmit = output<Date>();

  // injection
  i18n: NzI18nService = inject(NzI18nService);

  // hooks
  ngOnInit(): void {
    this.i18n.setLocale(en_US);
  }

  @ViewChild("datePickerEl") datePickerEl!: NzDatePickerComponent;
  ngAfterViewInit(): void {}

  // methods
  onChange(result: Date): void {
    console.log('onChange: ', result);
    this.dateChangeEventEmit.emit(result);
  }

  openDatePicker(): void {
    this.datePickerEl.open();
  }
}
