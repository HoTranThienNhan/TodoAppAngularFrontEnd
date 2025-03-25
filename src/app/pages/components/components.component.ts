import { Component, inject, ViewChild } from '@angular/core';
import { InputComponent } from '../../components/inputs/input/input.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSearchComponent } from '../../components/inputs/input-search/input-search.component';
import { TagComponent } from '../../components/tag/tag.component';
import { AddTagComponent } from '../../components/modals/add-tag/add-tag.component';
import { MenuTaskComponent } from '../../components/sidebar/menu-task/menu-task.component';
import { TaskItemComponent } from '../../components/task/task-item/task-item.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { SubtaskComponent } from '../../components/subtask/subtask.component';
import { AvatarProfileComponent } from '../../components/avatar-profile/avatar-profile.component';
import { AccountComponent } from '../../components/modals/account/account.component';

@Component({
  selector: 'app-components',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, InputSearchComponent, TagComponent, AddTagComponent, MenuTaskComponent, TaskItemComponent, DatePickerComponent, SubtaskComponent, AvatarProfileComponent, AccountComponent],
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss'
})
export class ComponentsComponent {
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

  @ViewChild(AccountComponent) accountComp!: AccountComponent;
  ngAfterViewInit(): void {

  }

  // methods
  onButtonSearchClick(searchValue: string): void {
    console.log(searchValue);
  }

  openTaskItemDetails(): void {
    console.log("open task item details sidebar");
  }

  toggleDoneTask(isDone: boolean): void {
    console.log(isDone);
  }

  toggleImportantTask(isImportant: boolean): void {
    console.log(isImportant);
  }

  changeDate(date: Date): void {
    console.log(date);
  }

  toggleDoneSubtask(subtask: { 'id': string, 'isDone': boolean }): void {
    console.log(subtask);
  }

  addNewSubtask(newSubtask: string): void {
    console.log(newSubtask);
  }

  deleteSubtask(id: string): void {
    console.log(id);
  }

  openAccountModal(): void {
    this.accountComp.showModal();
  }

  updateAccount(account: {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    avatar: string
  }): void {
    console.log(account);
  }
}
