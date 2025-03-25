import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputOtpComponent } from 'ng-zorro-antd/input';
import { OnlyDigitsDirective } from '../../../directives/only-digits/only-digits.directive';

@Component({
  selector: 'app-input-otp',
  imports: [NzInputOtpComponent, FormsModule, OnlyDigitsDirective],
  templateUrl: './input-otp.component.html',
  styleUrl: './input-otp.component.scss'
})
export class InputOtpComponent {
  // props
  value: string = "";
  changeOtpInputEventEmitter = output<string>();

  // methods
  formatter: (value: string) => string = value => value.toUpperCase();

  onChange(e: Event): void {
    this.changeOtpInputEventEmitter.emit(String(e));
  }
}
