import { Component, effect, ElementRef, inject, input, model, output, ViewChild } from '@angular/core';
import { DatePickerComponent } from "../../date-picker/date-picker.component";
import { TagComponent } from "../../tag/tag.component";
import { AddTagComponent } from "../../modals/add-tag/add-tag.component";
import { SubtaskComponent } from "../../subtask/subtask.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { TodoTask } from '../../../models/todo-task/todo-task/todo-task.model';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../models/user/user.model';
import { Tag } from '../../../models/tag/tag/tag.model';
import { TodoSubtask } from '../../../models/todo-subtask/todo-subtask/todo-subtask';
import { TodoTaskService } from '../../../services/todo-task/todo-task.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AlertComponent } from "../../sweet-alert/alert/alert.component";
import { AlertProps } from '../../../../types';
import { AlertSharedService } from '../../../services/shared/alert/alert.shared.service';
import { ClickOutsideDirective } from '../../../directives/click-outside/click-outside.directive';
import dayjs from 'dayjs';

@Component({
  selector: 'app-task-details-sidebar',
  imports: [DatePickerComponent, TagComponent, AddTagComponent, SubtaskComponent, ButtonComponent, ReactiveFormsModule, AlertComponent, ClickOutsideDirective],
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
  taskDetailsType = input<"Add" | "Update">("Add");
  alertProps!: AlertProps;
  date: Date = new Date();

  // injection
  fb: FormBuilder = inject(FormBuilder);
  todoTaskService: TodoTaskService = inject(TodoTaskService);
  message: NzMessageService = inject(NzMessageService);
  alertSharedService: AlertSharedService = inject(AlertSharedService);

  // hooks
  @ViewChild("importantEl") importantEl!: ElementRef;
  @ViewChild(SubtaskComponent) subtaskComp!: SubtaskComponent;
  @ViewChild(AlertComponent) alertCloseSidebarComp!: AlertComponent;
  ngOnInit(): void {
    this.date = new Date();

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

    if (!this.isCollapsed()) {
      document.body.classList.add("prevent-click");
    } else {
      document.body.classList.remove("prevent-click");
    }
  });

  // getters, setters
  get id(): FormGroup {
    return this.todoTaskDetailsForm.get('id') as FormGroup;
  }

  get name(): FormGroup {
    return this.todoTaskDetailsForm.get('name') as FormGroup;
  }

  get description(): FormGroup {
    return this.todoTaskDetailsForm.get('description') as FormGroup;
  }
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
    if (this.todoTask() && this.todoTask()?.date) {
      this.date = new Date(this.todoTask()?.date!);
    } else {
      this.date = new Date();
    }

    if (this.todoTask()) {

      this.todoTaskDetailsForm = this.fb.group({
        id: [this.todoTask()!.id, []],
        name: [this.todoTask()!.name ?? "", []],
        description: [this.todoTask()!.description, []],
        date: [this.todoTask()!.date !== "" ? this.todoTask()!.date : dayjs().format(), []],
        isImportant: [this.todoTask()!.isImportant, []],
        isDone: [this.todoTask()!.isDone, []],
        isDeleted: [this.todoTask()!.isDeleted, []],
        userId: [this.todoTask()!.userId, []],
        tags: [this.todoTask()?.tags, []],
        todoSubtasks: [this.todoTask()?.todoSubtasks, []],
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

  onCloseSidebar(): void {
    this.alertProps = {
      title: 'Verification!',
      htmlText: `Are you sure to <b>cancel</b> all the changes?`,
      icon: 'warning',
      iconColor: 'orange',
      showConfirmButton: true,
      showDenyButton: true,
      showCloseButton: false,
      confirmButtonText: 'Ok',
      denyButtonText: 'No',
      reverseButtons: true,
      allowOutsideClick: false,
      customClass: 'custom-alert-modal',
    };
    this.alertCloseSidebarComp.open(this.alertProps);
    this.alertSharedService.confirm(() => {
      this.closeSidebar();
    });
  }

  closeSidebar(): void {
    this.isCollapsed.set(true);
    this.notifyCollapsedEventEmitter.emit(this.isCollapsed());
    this.setInitTodoTaskDetailsForm();
    this.subtaskComp.resetNewSubtaskInputValue();
    this.notifyUpdateTodoTaskEventEmitter.emit();
  }

  addNew(): void {
    if (this.name.value === "") {
      this.message.error('Task name is required!', {
        nzDuration: 3000,
        nzPauseOnHover: true,
      });
    } else if (this.description.value === "") {
      this.message.error('Description is required!', {
        nzDuration: 3000,
        nzPauseOnHover: true,
      });
    } else {
      this.isCollapsed.set(true);
      this.notifyCollapsedEventEmitter.emit(this.isCollapsed());
      this.todoTaskService.add(this.todoTaskDetailsForm.value).subscribe({
        next: (res) => {
          this.notifyUpdateTodoTaskEventEmitter.emit();

          this.message.success('Add todo task successfully!', {
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

  onCancelAddTask(): void {
    this.alertProps = {
      title: 'Verification!',
      htmlText: `Are you sure to <b>cancel</b> adding new task?`,
      icon: 'warning',
      iconColor: 'orange',
      showConfirmButton: true,
      showDenyButton: true,
      showCloseButton: false,
      confirmButtonText: 'Ok',
      denyButtonText: 'No',
      reverseButtons: true,
      allowOutsideClick: false,
      customClass: 'custom-alert-modal',
    };
    this.alertCloseSidebarComp.open(this.alertProps);
    this.alertSharedService.confirm(() => {
      this.cancelAddTask();
    });
  }

  cancelAddTask(): void {
    this.closeSidebar();
  }

  onDeleteTask(id: string): void {
    this.alertProps = {
      title: 'Verification!',
      htmlText: `Are you sure to <b>delete</b> this task?`,
      icon: 'warning',
      iconColor: 'orange',
      showConfirmButton: true,
      showDenyButton: true,
      showCloseButton: false,
      confirmButtonText: 'Ok',
      denyButtonText: 'No',
      reverseButtons: true,
      allowOutsideClick: false,
      customClass: 'custom-alert-modal',
    };
    this.alertCloseSidebarComp.open(this.alertProps);
    this.alertSharedService.confirm(() => {
      this.deleteTask(id);
    });
  }

  deleteTask(id: string): void {
    this.todoTaskService.delete(id).subscribe({
      next: (res) => {
        this.notifyUpdateTodoTaskEventEmitter.emit();

        this.message.success('Delete todo task successfully!', {
          nzDuration: 3000,
          nzPauseOnHover: true,
        });
        
        this.closeSidebar();
      },
      error: (err) => {
          console.log(err);
      },
    });
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

  clickOutside(event: Event): void {
    let elementClicked: string = (event.target as HTMLInputElement).tagName;
    if (!this.isCollapsed() && (elementClicked === "APP-SHELL" || elementClicked === "SECTION")) {
      this.message.warning('Cannot trigger any action while filling the form!', {
        nzDuration: 3000,
        nzPauseOnHover: true,
      });
    }
  }

}
