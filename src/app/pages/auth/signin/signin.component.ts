import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../../../components/inputs/input/input.component';
import { ButtonComponent } from "../../../components/buttons/button/button.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  // props
  signInForm!: FormGroup;

  // injection
  fb: FormBuilder = inject(FormBuilder);

  // getter, setters
  get email(): FormControl {
    return this.signInForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  // hooks
  ngOnInit(): void {
      this.signInForm = this.fb.group({
        email: ['123', [Validators.required]],
        password: ['', [Validators.required]],
      });
  }
}
