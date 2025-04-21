import { Component, inject, input, output } from '@angular/core';
import { MenuTaskItemsComponent } from "../menu-task-items/menu-task-items.component";
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TodoTask } from '../../../models/todo-task/todo-task/todo-task.model';
import dayjs from 'dayjs';
import { TodoTaskSharedService } from '../../../services/shared/todo-task/todo-task.shared.service';
import { DayjsHelper } from '../../../helpers/dayjs/dayjs-helper.helper';

@Component({
  selector: 'app-menu-task',
  imports: [MenuTaskItemsComponent, NzToolTipModule],
  templateUrl: './menu-task.component.html',
  styleUrl: './menu-task.component.scss'
})
export class MenuTaskComponent {
  // props
  selectedTaskItems: Array<any> = [
    {
      "name": "today",
      "value": true,
      "count": 0,
    },
    {
      "name": "upcoming",
      "value": false,
      "count": 0,
    },
    {
      "name": "important",
      "value": false,
      "count": 0,
    },
    {
      "name": "done",
      "value": false,
      "count": 0,
    },
    {
      "name": "calendar",
      "value": false,
      "count": 0,
    },
  ];  
  isCollapsed = input<boolean>(false);
  navigateEventEmitter = output<string>();

  // injection
  todoTaskSharedService: TodoTaskSharedService = inject(TodoTaskSharedService);

  // hooks
  ngOnInit(): void {
    this.todoTaskSharedService.getTodoTasks().subscribe({
      next: (res: Array<TodoTask>) => {
        this.selectedTaskItems = this.selectedTaskItems.map(item => 
          item.name === "today" ? { ...item, count: this.countTodayTodoTask(res) } : item
        );

        this.selectedTaskItems = this.selectedTaskItems.map(item => 
          item.name === "upcoming" ? { ...item, count: this.countUpcomingTodoTask(res) } : item
        );

        this.selectedTaskItems = this.selectedTaskItems.map(item => 
          item.name === "important" ? { ...item, count: this.countImportantTodoTask(res) } : item
        );

        this.selectedTaskItems = this.selectedTaskItems.map(item => 
          item.name === "done" ? { ...item, count: this.countDoneTodoTask(res) } : item
        );
      }
    });
  }

  // methods
  navigateToTaskPage(item: string): void {
    this.selectedTaskItems = this.selectedTaskItems.map(taskItem => taskItem.name === item ? { ...taskItem, value: true } : { ...taskItem, value: false });
    this.navigateEventEmitter.emit(item);
  }

  setAllAsFalse(): void {
    this.selectedTaskItems = this.selectedTaskItems.map(taskItem => ({ ...taskItem, value: false }));
  }

  countTodayTodoTask(todoTasks: Array<TodoTask>): number {
    let count = 0;
    todoTasks.map((todoTask: TodoTask) => {
      if (dayjs().format("YYYY-MM-DD") === dayjs(todoTask.date).format("YYYY-MM-DD")) {
        count += 1;
      }
    }); 
    return count;
  }

  countUpcomingTodoTask(todoTasks: Array<TodoTask>): number {
    let count = 0;
    todoTasks.map((todoTask: TodoTask) => {
      if (DayjsHelper.compareTwoDateTime(dayjs(), dayjs(todoTask.date)) < 0) {
        count += 1;
      }
    }); 
    return count;
  }

  countImportantTodoTask(todoTasks: Array<TodoTask>): number {
    let count = 0;
    todoTasks.map((todoTask: TodoTask) => {
      if (todoTask.isImportant) {
        count += 1;
      }
    }); 
    return count;
  }

  countDoneTodoTask(todoTasks: Array<TodoTask>): number {
    let count = 0;
    todoTasks.map((todoTask: TodoTask) => {
      if (todoTask.isDone) {
        count += 1;
      }
    }); 
    return count;
  }
}
