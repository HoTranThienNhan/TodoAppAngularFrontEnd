import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from '../../../stores/user.store';
import { User } from '../../../models/user/user.model';
import { SidebarComponent } from "../../../components/sidebar/sidebar/sidebar.component";
import { TaskDetailsSidebarComponent } from "../../../components/sidebar/task-details-sidebar/task-details-sidebar.component";
import dayjs from 'dayjs';
import { TaskItemComponent } from "../../../components/task/task-item/task-item.component";

@Component({
  selector: 'app-today',
  imports: [SidebarComponent, TaskDetailsSidebarComponent, TaskItemComponent],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss'
})
export class TodayComponent {
  // props
  user!: User;
  currentDateString!: string; 

  // injection
  router: Router = inject(Router);
  userStore = inject(UserStore);

  // hooks
  ngOnInit(): void {
    this.user = this.userStore.getUser();
    this.currentDateString = dayjs().format("DD-MM-YYYY");
  }

  // methods
  openAddNewTask(): void {
    console.log("open add new task");
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
}
