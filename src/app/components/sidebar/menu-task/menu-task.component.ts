import { Component, input, output } from '@angular/core';
import { MenuTaskItemsComponent } from "../menu-task-items/menu-task-items.component";
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

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
      "value": true
    },
    {
      "name": "upcoming",
      "value": false
    },
    {
      "name": "important",
      "value": false
    },
    {
      "name": "done",
      "value": false
    },
    {
      "name": "calendar",
      "value": false
    },
  ];  
  isCollapsed = input<boolean>(false);
  navigateEventEmitter = output<string>();

  // methods
  navigateToTaskPage(item: string): void {
    this.selectedTaskItems = this.selectedTaskItems.map(taskItem => taskItem.name === item ? { ...taskItem, value: true } : { ...taskItem, value: false });
    this.navigateEventEmitter.emit(item);
  }

  setAllAsFalse(): void {
    this.selectedTaskItems = this.selectedTaskItems.map(taskItem => ({ ...taskItem, value: false }));
  }
}
