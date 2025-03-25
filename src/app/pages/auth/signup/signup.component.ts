import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from "../../../components/inputs/input/input.component";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from "../../../components/buttons/button/button.component";
import { Router, RouterLink } from '@angular/router';
import { ValidatorsService } from '../../../services/validators/validators.service';

@Component({
  selector: 'app-signup',
  imports: [InputComponent, ButtonComponent, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  // props
  signUpForm!: FormGroup;

  // injection
  fb: FormBuilder = inject(FormBuilder);
  validatorsService: ValidatorsService = inject(ValidatorsService);
  router: Router = inject(Router);

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
    console.log(this.signUpForm.value);

    if (this.signUpForm.valid) {
      this.router.navigate(['verify-email']);
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
