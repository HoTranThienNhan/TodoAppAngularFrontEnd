import { Component, inject, InputSignal, OnInit } from '@angular/core';
import { InputComponent } from '../../../components/inputs/input/input.component';
import { ButtonComponent } from "../../../components/buttons/button/button.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSearchComponent } from "../../../components/inputs/input-search/input-search.component";

@Component({
  selector: 'app-signin',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, InputSearchComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  // props
  signInForm!: FormGroup;
  searchForm!: FormGroup;

  // injection
  fb: FormBuilder = inject(FormBuilder);

  // getter, setters
  get email(): FormControl {
    return this.signInForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  get search(): FormControl {
    return this.searchForm.get('search') as FormControl;
  }

  // hooks
  ngOnInit(): void {
      this.signInForm = this.fb.group({
        email: ['123', [Validators.required]],
        password: ['', [Validators.required]],
      });

      this.searchForm = this.fb.group({
        search: ['']
      });
  }

  // methods
  onButtonSearchClick(search: FormControl): void {
    console.log(search.value);
  }
}
