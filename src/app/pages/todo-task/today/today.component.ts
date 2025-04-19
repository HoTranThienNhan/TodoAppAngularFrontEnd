import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from '../../../stores/user.store';
import { User } from '../../../models/user/user.model';
import { SidebarComponent } from "../../../components/sidebar/sidebar/sidebar.component";
import { TaskDetailsSidebarComponent } from "../../../components/sidebar/task-details-sidebar/task-details-sidebar.component";
import { Dayjs } from 'dayjs';
import { TaskItemComponent } from "../../../components/task/task-item/task-item.component";
import { ConvertDateStringPipe } from '../../../pipes/convert-date-string.pipe';
import { TodoTaskService } from '../../../services/todo-task/todo-task.service';
import { TodoTask } from '../../../models/todo-task/todo-task/todo-task.model';
import { I18nPluralPipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TodoTaskSharedService } from '../../../services/shared/todo-task/todo-task.shared.service';

@Component({
  selector: 'app-today',
  imports: [SidebarComponent, TaskDetailsSidebarComponent, TaskItemComponent, ConvertDateStringPipe, I18nPluralPipe],
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

  // hooks
  ngOnInit(): void {
    this.user = this.userStore.getUser();
    if (this.user) {
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
  }

  toggleDoneTask(isDone: boolean, todoTask: TodoTask): void {
    this.todoTaskService.update({
      ...todoTask,
      isDone: isDone,
    }).subscribe();

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
    }).subscribe();

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
    
    this.selectedTodoTask = {
      ...todoTask,
      isImportant: isImportant,
    };
  }

  toggleRightSidebarCollapsed(isCollapsed: boolean): void {
    this.rightSidebarCollapsed = isCollapsed;
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
}
