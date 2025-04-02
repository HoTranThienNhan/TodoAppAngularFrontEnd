import { Component, effect, ElementRef, inject, input, model, output, ViewChild } from '@angular/core';
import { DatePickerComponent } from "../../date-picker/date-picker.component";
import { TagComponent } from "../../tag/tag.component";
import { AddTagComponent } from "../../modals/add-tag/add-tag.component";
import { SubtaskComponent } from "../../subtask/subtask.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { TodoTask } from '../../../models/todo-task/todo-task/todo-task.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';

@Component({
  selector: 'app-task-details-sidebar',
  imports: [DatePickerComponent, TagComponent, AddTagComponent, SubtaskComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './task-details-sidebar.component.html',
  styleUrl: './task-details-sidebar.component.scss'
})
export class TaskDetailsSidebarComponent {
  // props
  isImportant = model<boolean>(false);
  isCollapsed = model<boolean>(true);
  notifyCollapsedEventEmitter = output<boolean>();
  todoTask = input<TodoTask>();
  todoTaskDetailsForm!: FormGroup;

  // injection
  fb: FormBuilder = inject(FormBuilder);

  // hooks
  @ViewChild("importantEl") importantEl!: ElementRef;
  ngOnInit(): void {
    this.todoTaskDetailsForm = this.fb.group({
      id: ["", []],
      name: ["", []],
      description: ["", []],
      date: ["", []],
      isImportant: [false, []],
      isDone: [false, []],
      isDeleted: [false, []],
      userId: ["", []],
    });
  }

  todoTaskEffect = effect(() => {
    if (this.todoTask()) {
      this.todoTaskDetailsForm = this.fb.group({
        id: [this.todoTask()!.id, []],
        name: [this.todoTask()!.name ?? "", []],
        description: [this.todoTask()!.description, []],
        date: [this.todoTask()!.date, []],
        isImportant: [this.todoTask()!.isImportant, []],
        isDone: [this.todoTask()!.isDone, []],
        isDeleted: [this.todoTask()!.isDeleted, []],
        userId: [this.todoTask()!.userId, []],
      });
    }
  });

  // methods
  checkAsImportant(): void {
    // important element
    if (this.importantEl.nativeElement.classList.contains('checked')) {
      this.importantEl.nativeElement.classList.remove('checked');
    } else {
      this.importantEl.nativeElement.classList.add('checked');
    }
    // emit isImportant
    this.isImportant.set(!this.isImportant());
    this.todoTaskDetailsForm.get('isImportant')!.patchValue(!this.todoTaskDetailsForm.get('isImportant')!.value);
  }

  changeDate(date: Date): void {
    this.todoTaskDetailsForm.get('date')!.patchValue(dayjs(date).format());
  }

  toggleDoneSubtask(subtask: { 'id': string, 'isDone': boolean }): void {
    console.log("subtask", subtask);
  }

  addNewSubtask(newSubtask: string): void {
    console.log("newSubtask", newSubtask);
  }

  deleteSubtask(id: string): void {
    console.log("id", id);
  }

  closeSidebar(): void {
    this.isCollapsed.set(true);
    this.notifyCollapsedEventEmitter.emit(this.isCollapsed())
  }

  saveChanges(): void {
    // this.todoTaskDetailsForm = this.fb.group({
    //   id: [this.todoTask()!.id, []],
    //   name: [this.todoTask()!.name ?? "", []],
    //   description: [this.todoTask()!.description, []],
    //   date: [this.todoTask()!.date, []],
    //   isImportant: [this.todoTask()!.isImportant, []],
    //   isDone: [this.todoTask()!.isDone, []],
    //   isDeleted: [this.todoTask()!.isDeleted, []],
    //   userId: [this.todoTask()!.userId, []],
    // });

    console.log(this.todoTaskDetailsForm.value);
  }

}
