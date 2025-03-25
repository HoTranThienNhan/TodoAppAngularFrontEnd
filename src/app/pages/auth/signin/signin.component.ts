import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { InputComponent } from '../../../components/inputs/input/input.component';
import { ButtonComponent } from '../../../components/buttons/button/button.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputCheckboxComponent } from "../../../components/inputs/input-checkbox/input-checkbox.component";

@Component({
  selector: 'app-signin',
  imports: [InputComponent, ButtonComponent, RouterLink, InputCheckboxComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  // props
    signInForm!: FormGroup;
  
    // injection
    fb: FormBuilder = inject(FormBuilder);
  
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
    }

    // methods
    onCheckboxValueChange(checboxValue: boolean): void {
      this.remember.setValue(checboxValue);
      console.log(this.signInForm.value);
    }
}
