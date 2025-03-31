import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { InputComponent } from '../../../components/inputs/input/input.component';
import { ButtonComponent } from '../../../components/buttons/button/button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputCheckboxComponent } from "../../../components/inputs/input-checkbox/input-checkbox.component";
import { SpinnerComponent } from "../../../components/loadings/spinner/spinner.component";
import { AuthService } from '../../../services/auth/auth.service';
import { SigninDto } from '../../../models/auth/signin-dto/signin-dto.model';
import { catchError, EMPTY, finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStore } from '../../../stores/user.store';

@Component({
  selector: 'app-signin',
  imports: [InputComponent, ButtonComponent, RouterLink, InputCheckboxComponent, SpinnerComponent, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  // props
  signInForm!: FormGroup;
  isLoading: boolean = false;
  userSignIn!: SigninDto;
  errorMessage: string = "";
  returnUrl: string = "/today";

  // injection
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  message: NzMessageService = inject(NzMessageService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  userStore = inject(UserStore);

  // getters, setters
  get email(): FormControl {
    return this.signInForm.get("email") as FormControl;
  }

  get password(): FormControl {
    return this.signInForm.get("password") as FormControl;
  }

  get remember(): FormControl {
    return this.signInForm.get("remember") as FormControl;
  }

  // hooks
  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false,]
    });

    // reset errorMessage when email or password has been changed
    this.signInForm.valueChanges.subscribe(() => {
      this.errorMessage = "";
    });

    // auth guard redirect url after signing in
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.returnUrl;
  }

  // methods
  onCheckboxValueChange(checboxValue: boolean): void {
    this.remember.setValue(checboxValue);
    console.log(this.signInForm.value);
  }

  signIn(): void {
    this.userSignIn = {
      email: this.email.value,
      password: this.password.value
    };

    if (this.signInForm.valid) {
      this.isLoading = true;
      this.email.disable();
      this.password.disable();

      this.authService.signin(this.userSignIn).pipe(
        finalize(() => {
          this.isLoading = false;
          this.email.enable({ emitEvent: false });
          this.password.enable({ emitEvent: false });
        }),
        catchError((err) => {
          console.log(err);

          this.errorMessage = err.error.message;

          this.message.error('Some error occurred during your sign in!', {
            nzDuration: 3000,
            nzPauseOnHover: true,
          });

          return EMPTY;
        })
      ).subscribe({
        next: (res) => {
          this.authService.setAccessToken(res.data!.accessToken);

          this.message.success('Sign in successfully!', {
            nzDuration: 3000,
            nzPauseOnHover: true,
          });

          this.authService.getProfile(this.email.value).subscribe({
            next: (res) => {
              this.userStore.storeUser(res.data);

              this.router.navigate([this.returnUrl]);
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }

  forgotPassword(): void {
    
  }
}
