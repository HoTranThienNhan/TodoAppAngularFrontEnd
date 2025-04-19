import { Component, inject, input, OnInit, output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { InputComponent } from "../../inputs/input/input.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FullNamePipe } from '../../../pipes/full-name.pipe';
import { User } from '../../../models/user/user.model';
import { ButtonFileUploadComponent } from "../../buttons/button-file-upload/button-file-upload.component";
import { UserStore } from '../../../stores/user.store';

@Component({
  selector: 'app-account',
  imports: [NzModalModule, InputComponent, ButtonComponent, FullNamePipe, ButtonFileUploadComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  // props
  isVisible = false;
  accountForm!: FormGroup;
  user: User = new User(
    'userid',
    'First Name',
    "",
    'username',
    'email@gmail.com',
    '0123456789',
    true,
    '../assets/images/avatar.jpg'
  );
  changeAccountEventEmitter = output<User>();

  // injection
  fb: FormBuilder = inject(FormBuilder);
  userStore = inject(UserStore);

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
    this.user = this.userStore.getUser();

    this.accountForm = this.fb.group({
      id: [this.user.id,],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName],
      userName: [this.user.username,],
      email: [this.user.email, Validators.required],
      phone: [this.user.phone, Validators.required],
      avatar: [this.user.avatar],
      isActive: [true,],
    });
  }

  // methods
  showModal(): void {
    this.isVisible = true;
    this.user = this.userStore.getUser();
  }

  handleOk(): void {
    this.isVisible = false;
    this.changeAccountEventEmitter.emit(this.accountForm.value);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetAccountForm();
  }

  resetAccountForm(): void {
    this.accountForm = this.fb.group({
      id: [this.user.id,],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName],
      userName: [this.user.username,],
      email: [this.user.email, Validators.required],
      phone: [this.user.phone, Validators.required],
      avatar: [this.user.avatar],
      isActive: [true,],
    });
  }

  setBase64AvatarImage(base64: string): void {
    this.avatar.setValue(base64);
  }
}
