import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from '../../../stores/user.store';
import { User } from '../../../models/user/user.model';
import { TaskDetailsSidebarComponent } from "../../../components/sidebar/task-details-sidebar/task-details-sidebar.component";
import { Dayjs } from 'dayjs';
import { TaskItemComponent } from "../../../components/task/task-item/task-item.component";
import { ConvertDateStringPipe } from '../../../pipes/convert-date-string.pipe';
import { TodoTaskService } from '../../../services/todo-task/todo-task.service';
import { TodoTask } from '../../../models/todo-task/todo-task/todo-task.model';
import { I18nPluralPipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TodoTaskSharedService } from '../../../services/shared/todo-task/todo-task.shared.service';
import { switchMap } from 'rxjs';
import { AllTodoTasksResDto } from '../../../models/todo-task/all-todo-tasks-res-dto/all-todo-tasks-res-dto.model';
import { SelectedMenuTaskItemStore } from '../../../stores/menu-task-item.store';
import { AvatarProfileComponent } from "../../../components/avatar-profile/avatar-profile.component";

@Component({
  selector: 'app-today',
  imports: [TaskDetailsSidebarComponent, TaskItemComponent, ConvertDateStringPipe, I18nPluralPipe, AvatarProfileComponent],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss'
})
export class TodayComponent {
  // props
  user!: User;
  currentDate!: Dayjs; 
  todoTasks: Array<TodoTask> = [];
  todoTasksQuantityTextMapping: {[k: string]: string} = {
    '=0': '0 task',
    '=1': '1 task',
    'other': '# tasks',
  };
  rightSidebarCollapsed: boolean = true;
  selectedTodoTask!: TodoTask;
  taskDetailsType: "Add" | "Update" = "Add";

  // injection
  router: Router = inject(Router);
  userStore = inject(UserStore);
  todoTaskService: TodoTaskService = inject(TodoTaskService);
  message: NzMessageService = inject(NzMessageService);
  todoTaskSharedService: TodoTaskSharedService = inject(TodoTaskSharedService);
    selectedMenuTaskItemStore = inject(SelectedMenuTaskItemStore);

  // hooks
  @ViewChildren(TaskItemComponent) taskItemsComp!: QueryList<TaskItemComponent>;

  ngOnInit(): void {
    this.user = this.userStore.getUser();
    if (this.user) {
      this.todoTaskService.getAll(this.user.id, "Today")
      .subscribe({
        next: (res) => {
          this.todoTasks = res.data!;
        },
        error: (err) => {
          console.log(err);
        }
      });

      this.todoTaskService.getAll(this.user.id).subscribe({
        next: (res) => {
          this.todoTaskSharedService.setTodoTasks(res.data!);
        }
      });
    }

    this.selectedMenuTaskItemStore.storeSelectedMenuTaskItemState("today");
  }

  // methods
  openAddNewTask(): void {
    this.rightSidebarCollapsed = false;
    this.taskDetailsType = "Add";
    this.selectedTodoTask = {
      id: "",
      name: "",
      description: "",
      date: "",
      isImportant: false,
      isDone: false,
      isDeleted: false,
      userId: this.user.id,
      createdAt: "",
      tags: [],
      todoSubtasks: [],
    };
  }

  openTaskItemDetails(todoTask: TodoTask): void {
    this.rightSidebarCollapsed = false;
    this.selectedTodoTask = todoTask;
    this.taskDetailsType = "Update";
    console.log(this.selectedTodoTask);
  }

  toggleDoneTask(isDone: boolean, todoTask: TodoTask): void {
    this.todoTaskService.update({
      ...todoTask,
      isDone: isDone,
    }).pipe(
      switchMap((res) => {
        return this.todoTaskService.getAll(this.user.id, "Today");
      }),
      switchMap((resGetAllToday: AllTodoTasksResDto) => {
        this.todoTasks = resGetAllToday.data!;
        return this.todoTaskService.getAll(this.user.id);
      })
    ).subscribe((resGetAll: AllTodoTasksResDto) => {
        this.todoTaskSharedService.setTodoTasks(resGetAll.data!);
    });

    let messageContent: string = '';
    if (isDone) {
      messageContent = 'Mark Todo task as Done!';
    } else {
      messageContent = 'Unmark Todo task as Done!';
    }

    this.message.success(messageContent, {
      nzDuration: 3000,
      nzPauseOnHover: true,
    });
  }

  toggleImportantTask(isImportant: boolean, todoTask: TodoTask): void {
    this.todoTaskService.update({
      ...todoTask,
      isImportant: isImportant,
    }).pipe(
      switchMap((res) => {
        return this.todoTaskService.getAll(this.user.id, "Today");
      }),
      switchMap((resGetAllToday: AllTodoTasksResDto) => {
        this.todoTasks = resGetAllToday.data!;
        return this.todoTaskService.getAll(this.user.id);
      })
    ).subscribe((resGetAll: AllTodoTasksResDto) => {
        this.todoTaskSharedService.setTodoTasks(resGetAll.data!);
    });

    let messageContent: string = '';
    if (isImportant) {
      messageContent = 'Mark Todo task as Important!';
    } else {
      messageContent = 'Unmark Todo task as Important!';
    }

    this.message.success(messageContent, {
      nzDuration: 3000,
      nzPauseOnHover: true,
    });
    
    this.selectedTodoTask = {
      ...todoTask,
      isImportant: isImportant,
    };
  }

  toggleRightSidebarCollapsed(isCollapsed: boolean): void {
    this.rightSidebarCollapsed = isCollapsed;

    if (isCollapsed) {
      this.removeOtherSelectedItem();
    }
  }

  notifyUpdateTodoTask(): void {
    this.todoTaskService.getAll(this.user.id, "Today").subscribe({
      next: (res) => {
        this.todoTasks = res.data!;
      }
    });
    this.todoTaskService.getAll(this.user.id).subscribe({
      next: (res) => {
        this.todoTaskSharedService.setTodoTasks(res.data!);
      }
    });
  }

  removeOtherSelectedItem(): void {
    this.taskItemsComp.toArray().forEach(taskItem => taskItem.isSelectedItem.set(false));
  }

  openAccountModal(): void {}
}
