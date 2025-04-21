import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStore } from '../../../stores/user.store';
import { User } from '../../../models/user/user.model';
import { TaskDetailsSidebarComponent } from "../../../components/sidebar/task-details-sidebar/task-details-sidebar.component";
import { TaskItemComponent } from "../../../components/task/task-item/task-item.component";
import { TodoTaskService } from '../../../services/todo-task/todo-task.service';
import { TodoTask } from '../../../models/todo-task/todo-task/todo-task.model';
import { I18nPluralPipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TodoTaskSharedService } from '../../../services/shared/todo-task/todo-task.shared.service';
import { switchMap } from 'rxjs';
import { AllTodoTasksResDto } from '../../../models/todo-task/all-todo-tasks-res-dto/all-todo-tasks-res-dto.model';

@Component({
  selector: 'app-search',
  imports: [TaskDetailsSidebarComponent, TaskItemComponent, I18nPluralPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  // props
  user!: User;
  todoTasks: Array<TodoTask> = [];
  todoTasksQuantityTextMapping: {[k: string]: string} = {
    '=0': '0 task',
    '=1': '1 task',
    'other': '# tasks',
  };
  rightSidebarCollapsed: boolean = true;
  selectedTodoTask!: TodoTask;
  taskDetailsType: "Add" | "Update" = "Add";
  key: string = "";

  // injection
  router: Router = inject(Router);
  userStore = inject(UserStore);
  todoTaskService: TodoTaskService = inject(TodoTaskService);
  message: NzMessageService = inject(NzMessageService);
  todoTaskSharedService: TodoTaskSharedService = inject(TodoTaskSharedService);
  route: ActivatedRoute = inject(ActivatedRoute);

  // hooks
  ngOnInit(): void {
    this.user = this.userStore.getUser();
    this.route.queryParamMap.subscribe(params => {
      if (params.get('key')) {
        this.key = params.get('key')!;
      }
    });
    if (this.user) {
      this.todoTaskService.getAll(this.user.id, undefined, undefined, this.key).subscribe({
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
  openTaskItemDetails(todoTask: TodoTask): void {
    this.rightSidebarCollapsed = false;
    this.selectedTodoTask = todoTask;
    this.taskDetailsType = "Update";
  }

  toggleDoneTask(isDone: boolean, todoTask: TodoTask): void {
    this.todoTaskService.update({
      ...todoTask,
      isDone: isDone,
    }).pipe(
      switchMap((res) => {
        return this.todoTaskService.getAll(this.user.id, undefined, undefined, this.key);
      }),
      switchMap((resGetAllBySearch: AllTodoTasksResDto) => {
        this.todoTasks = resGetAllBySearch.data!;
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
        return this.todoTaskService.getAll(this.user.id, undefined, undefined, this.key);
      }),
      switchMap((resGetAllBySearch: AllTodoTasksResDto) => {
        this.todoTasks = resGetAllBySearch.data!;
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
  }

  notifyUpdateTodoTask(): void {
    this.todoTaskService.getAll(this.user.id, undefined, undefined, this.key).subscribe({
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

