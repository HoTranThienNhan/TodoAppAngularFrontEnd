import {  Component, inject, input, ViewChild } from '@angular/core';
import { InputOtpComponent } from "../../../components/inputs/input-otp/input-otp.component";
import { ButtonComponent } from "../../../components/buttons/button/button.component";
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { CountdownTimerComponent } from "../../../components/countdown-timer/countdown-timer.component";

@Component({
  selector: 'app-verify-email',
  imports: [InputOtpComponent, ButtonComponent, CountdownTimerComponent],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent {
  // props
  email = input<string>("email@gmail.com");
  errorMessage = input<string>("Error message");
  otpValue: string = "";
  storedIsRequested = localStorage.getItem('isRequested');
  isRequested: boolean = this.storedIsRequested ? JSON.parse(this.storedIsRequested) : false;
  storedOtpTime = localStorage.getItem('countdownTimeOtp');
  countdownTimeOtp: number = this.storedOtpTime ? Number(this.storedOtpTime) / 1000 : 20;
  storedRequestTime = localStorage.getItem('countdownTimeRequest');
  countdownTimeRequest: number = this.storedRequestTime ? Number(this.storedRequestTime) / 1000 : 10;

  @ViewChild('cdRequest') countdownRequest!: CountdownTimerComponent;
  configCdRequest: CountdownConfig = {
    demand: false,
    notify: 0,
    leftTime: this.countdownTimeRequest,
    format: 'mm:ss'
  };

  @ViewChild('cdOtp') countdownOtp!: CountdownTimerComponent;
  configCdOtp: CountdownConfig = {
    demand: false,
    notify: 0,
    leftTime: this.countdownTimeOtp,
    format: 'mm:ss'
  };

  // hooks
  ngOnInit(): void {
    const storedOtpTime = localStorage.getItem('countdownTimeOtp');
    if (storedOtpTime) {
      this.configCdOtp = {
        ...this.configCdOtp,
        leftTime: Number(storedOtpTime) / 1000
      };
    }

    const storedRequestTime = localStorage.getItem('countdownTimeRequest');
    if (storedRequestTime) {
      this.configCdRequest = {
        ...this.configCdRequest,
        leftTime: Number(storedRequestTime) / 1000
      };
    }

    const storedIsRequested = localStorage.getItem('isRequested');
    if (storedRequestTime) {
      this.storedIsRequested = storedIsRequested;
    }
  }

  // methods
  sendRequest(): void {
    this.isRequested = true;
    localStorage.setItem('isRequested', 'true');
    this.countdownOtp.restart(20);
    this.countdownRequest.restart(10);
  }

  onCdRequestDone(e: CountdownEvent): void {
    this.isRequested = false;
    localStorage.setItem('isRequested', 'false');
    localStorage.removeItem('isRequested');
  }

  onCdOtpDone(e: CountdownEvent): void {

  }

  onOtpChange(otpValue: string): void {
    this.otpValue = otpValue;
  }

  verifyCode(): void {
    console.log(this.otpValue);
  }
}
