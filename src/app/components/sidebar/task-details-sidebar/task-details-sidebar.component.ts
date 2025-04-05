import { Component, effect, ElementRef, inject, input, model, output, ViewChild } from '@angular/core';
import { DatePickerComponent } from "../../date-picker/date-picker.component";
import { TagComponent } from "../../tag/tag.component";
import { AddTagComponent } from "../../modals/add-tag/add-tag.component";
import { SubtaskComponent } from "../../subtask/subtask.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { TodoTask } from '../../../models/todo-task/todo-task/todo-task.model';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import { User } from '../../../models/user/user.model';
import { Tag } from '../../../models/tag/tag/tag.model';
import { TodoSubtask } from '../../../models/todo-subtask/todo-subtask/todo-subtask';
import { TodoTaskService } from '../../../services/todo-task/todo-task.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-task-details-sidebar',
  imports: [DatePickerComponent, TagComponent, AddTagComponent, SubtaskComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './task-details-sidebar.component.html',
  styleUrl: './task-details-sidebar.component.scss'
})
export class TaskDetailsSidebarComponent {
  // props
  isCollapsed = model<boolean>(true);
  todoTask = input<TodoTask>();
  user = input<User>();
  todoTaskDetailsForm!: FormGroup;
  currentSelectedTags: Array<Tag> = [];
  notifyCollapsedEventEmitter = output<boolean>();
  notifyUpdateTodoTaskEventEmitter = output<void>();
  c: string = "hello";

  // injection
  fb: FormBuilder = inject(FormBuilder);
  todoTaskService: TodoTaskService = inject(TodoTaskService);
  message: NzMessageService = inject(NzMessageService);

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
      tags: this.fb.array([]),
      todoSubtasks: this.fb.array([{
        id: ["", []],
        name: ["", []],
        isDone: [false, []],
      }]),
    });
  }

  todoTaskEffect = effect(() => {
    this.setInitTodoTaskDetailsForm();
  });

  // getters, setters
  get tags(): FormArray {
    return this.todoTaskDetailsForm.get('tags') as FormArray;
  }

  get todoSubtasks(): FormArray {
    return this.todoTaskDetailsForm.get('todoSubtasks') as FormArray;
  }

  get isImportant(): FormControl {
    return this.todoTaskDetailsForm.get('isImportant') as FormControl;
  }


  // methods
  setInitTodoTaskDetailsForm(): void {
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
        tags: [this.todoTask()?.tags, []],
        todoSubtasks: [this.todoTask()?.todoSubTasks, []],
      });
      
      this.currentSelectedTags = this.todoTask()?.tags!;
    }
  }

  checkAsImportant(): void {
    // important element
    if (this.importantEl.nativeElement.classList.contains('checked')) {
      this.importantEl.nativeElement.classList.remove('checked');
    } else {
      this.importantEl.nativeElement.classList.add('checked');
    }
    // emit isImportant
    this.todoTaskDetailsForm.get('isImportant')!.patchValue(!this.todoTaskDetailsForm.get('isImportant')!.value);
  }

  changeDate(date: Date): void {
    this.todoTaskDetailsForm.get('date')!.patchValue(dayjs(date).format());
  }

  toggleDoneSubtask(subtask: TodoSubtask): void {
    this.todoSubtasks.value.filter((item: TodoSubtask, index: number) => {
      if (subtask.name === item.name) {
        this.todoSubtasks.value[index] = {
          ...this.todoSubtasks.value[index],
          isDone: subtask.isDone
        };
      }
    })
  }

  addNewSubtask(newSubtask: string): void {
    if (newSubtask !== "") {
      let todoSubtask: TodoSubtask = {
        isDone: false,
        name: newSubtask,
      };
  
      this.todoSubtasks.patchValue([...this.todoSubtasks.value, todoSubtask]);
    }
  }

  deleteSubtask(name: string): void {
    let filteredTodoSubtasks = this.todoSubtasks.value.filter((item: TodoSubtask) => {
      return item.name !== name;
    });

    this.todoSubtasks.setValue(filteredTodoSubtasks);
  }

  selectTags(tags: Array<Tag>): void {
    this.todoTaskDetailsForm.get('tags')!.patchValue(tags);
    this.currentSelectedTags = tags;
  }

  closeSidebar(): void {
    this.isCollapsed.set(true);
    this.notifyCollapsedEventEmitter.emit(this.isCollapsed());
    this.setInitTodoTaskDetailsForm();
  }

  saveChanges(): void {
    this.isCollapsed.set(true);
    this.notifyCollapsedEventEmitter.emit(this.isCollapsed());
    this.todoTaskService.update(this.todoTaskDetailsForm.value).subscribe({
      next: (res) => {
        this.notifyUpdateTodoTaskEventEmitter.emit();

        this.message.success('Update todo task successfully!', {
          nzDuration: 3000,
          nzPauseOnHover: true,
        });
      },
      error: (err) => {
        console.log(err);

        this.message.error(err.error.message, {
          nzDuration: 3000,
          nzPauseOnHover: true,
        });
      }
    });
  }

}
