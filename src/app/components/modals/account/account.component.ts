import { Component, inject, input, OnInit, output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { InputComponent } from "../../inputs/input/input.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FullNamePipe } from '../../../pipes/full-name.pipe';
import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-account',
  imports: [NzModalModule, InputComponent, ButtonComponent, FullNamePipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  // props
  isVisible = false;
  accountForm!: FormGroup;
  account = input<User>(new User(
    'userid',
    'First Name',
    "",
    'username',
    'email@gmail.com',
    '0123456789',
    true,
    '../assets/images/avatar.jpg'
  ));
  changeAccountEventEmitter = output<User>();

  // injection
  fb: FormBuilder = inject(FormBuilder);

  // getter, setters
  get firstName(): FormControl {
    return this.accountForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.accountForm.get('lastName') as FormControl;
  }

  get email(): FormControl {
    return this.accountForm.get('email') as FormControl;
  }

  get phone(): FormControl {
    return this.accountForm.get('phone') as FormControl;
  }

  get avatar(): FormControl {
    return this.accountForm.get('avatar') as FormControl;
  }


  // hooks 
  ngOnInit(): void {
    this.accountForm = this.fb.group({
      firstName: [this.account().firstName, Validators.required],
      lastName: [this.account().lastName, Validators.required],
      email: [this.account().email, Validators.required],
      phone: [this.account().phone, Validators.required],
      avatar: [this.account().avatar, Validators.required]
    });
  }

  // methods
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.changeAccountEventEmitter.emit(this.accountForm.value);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
