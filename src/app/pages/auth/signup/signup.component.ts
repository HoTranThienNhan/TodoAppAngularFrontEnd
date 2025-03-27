import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from "../../../components/inputs/input/input.component";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from "../../../components/buttons/button/button.component";
import { Router, RouterLink } from '@angular/router';
import { ValidatorsService } from '../../../services/validators/validators.service';
import { AuthService } from '../../../services/auth/auth.service';
import { RegisterDto } from '../../../models/auth/register-dto/register-dto.model';
import { catchError, EMPTY, finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SpinnerComponent } from "../../../components/loadings/spinner/spinner.component";

@Component({
  selector: 'app-signup',
  imports: [InputComponent, ButtonComponent, RouterLink, SpinnerComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  // props
  signUpForm!: FormGroup;
  userRegister!: RegisterDto;
  isLoading: boolean = false;

  // injection
  fb: FormBuilder = inject(FormBuilder);
  validatorsService: ValidatorsService = inject(ValidatorsService);
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  message: NzMessageService = inject(NzMessageService);

  // getters, setters
  get firstName(): FormControl {
    return this.signUpForm.get("firstName") as FormControl;
  }

  get lastName(): FormControl {
    return this.signUpForm.get("lastName") as FormControl;
  }

  get username(): FormControl {
    return this.signUpForm.get("username") as FormControl;
  }

  get phone(): FormControl {
    return this.signUpForm.get("phone") as FormControl;
  }

  get email(): FormControl {
    return this.signUpForm.get("email") as FormControl;
  }

  get password(): FormControl {
    return this.signUpForm.get("password") as FormControl;
  }

  // hooks
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(35), this.validatorsService.ValidateOnlyLetters()]],
      lastName: ['', [Validators.maxLength(35), this.validatorsService.ValidateOnlyLetters()]],
      username: ['', [Validators.required, Validators.maxLength(10)]],
      phone: ['', [Validators.required, this.validatorsService.ValidatePhoneNumber('VN')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validatorsService.ValidatePassword()]],
    });
  }

  // methos
  signUp(): void {
    this.userRegister = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      username: this.username.value,
      phone: this.phone.value,
      email: this.email.value,
      password: this.password.value
    };

    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.authService.register(this.userRegister).pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((err) => {
          console.log(err);

          this.message.error('Some error occurred during your registration!', {
            nzDuration: 3000,
            nzPauseOnHover: true,
          });

          return EMPTY;
        })
      ).subscribe({
        next: (res) => {
          console.log(res);

          this.message.success('Please verify your email!', {
            nzDuration: 3000,
            nzPauseOnHover: true,
          });

          this.router.navigate(['verify-email'], {
            queryParams: { 
              email: this.email.value, 
              firstName: this.firstName.value 
            }
          });
        }
      });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
