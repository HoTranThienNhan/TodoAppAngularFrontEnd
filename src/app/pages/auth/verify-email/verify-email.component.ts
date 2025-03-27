import {  Component, inject, ViewChild } from '@angular/core';
import { InputOtpComponent } from "../../../components/inputs/input-otp/input-otp.component";
import { ButtonComponent } from "../../../components/buttons/button/button.component";
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { CountdownTimerComponent } from "../../../components/countdown-timer/countdown-timer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SpinnerComponent } from "../../../components/loadings/spinner/spinner.component";

@Component({
  selector: 'app-verify-email',
  imports: [InputOtpComponent, ButtonComponent, CountdownTimerComponent, SpinnerComponent],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent {
  // props
  email: string = "";
  errorMessage: string = "";
  firstName: string = "";
  otpValue: string = "";
  isLoading: boolean = false;
  storedIsRequested = localStorage.getItem('isRequested');
  isRequested: boolean = this.storedIsRequested ? JSON.parse(this.storedIsRequested) : false;
  storedOtpTime = localStorage.getItem('countdownTimeOtp');
  defaultCountdownTimeOtp: number = 300;  // 5 minutes
  defaultCountdownTimeRequest: number = 60;   // 1 minute
  countdownTimeOtp: number = this.storedOtpTime ? Number(this.storedOtpTime) / 1000 : this.defaultCountdownTimeOtp;
  storedRequestTime = localStorage.getItem('countdownTimeRequest');
  countdownTimeRequest: number = this.storedRequestTime ? Number(this.storedRequestTime) / 1000 : this.defaultCountdownTimeRequest;

  // injection
  route: ActivatedRoute = inject(ActivatedRoute);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  message: NzMessageService = inject(NzMessageService);

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

    // get email from queryParams
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.firstName = params['firstName'];
    });
  }

  // methods
  sendRequest(): void {
    this.isRequested = true;
    localStorage.setItem('isRequested', 'true');

    this.authService.resendCode(this.email, this.firstName).pipe(
      catchError((err) => {
        this.errorMessage = err.error.message;

        this.message.error('Cannot resend OTP code via your email!', {
          nzDuration: 3000,
          nzPauseOnHover: true,
        });

        return EMPTY;
      })
    ).subscribe({
      next: (res) => {
        console.log(res);

        this.message.success('Resend OTP code via your email successfully', {
          nzDuration: 3000,
          nzPauseOnHover: true,
        });

        this.countdownOtp.restart(this.defaultCountdownTimeOtp);
        this.countdownRequest.restart(this.defaultCountdownTimeRequest);
      }
    });
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
    // reset errorMessage when OTP value has been changed
    this.errorMessage = "";
  }

  verifyCode(): void {
    this.isLoading = true;
    this.authService.confirmEmailRegister(this.email, this.otpValue).pipe(
      finalize(() => {
        this.isLoading = false;
      }),
      catchError((err) => {
        this.errorMessage = err.error.message;

        this.message.error('Cannot confirm your email!', {
          nzDuration: 3000,
          nzPauseOnHover: true,
        });

        return EMPTY;
      })
    ).subscribe({
      next: (res) => {
        console.log(res);

        this.message.success('Confirm your email successfully! Your account is registered!', {
          nzDuration: 3000,
          nzPauseOnHover: true,
        });

        this.router.navigate(['signin']);
      }
    });

  }
}
