import { Component, input, output } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-menu-task-items',
  imports: [NzToolTipModule],
  templateUrl: './menu-task-items.component.html',
  styleUrl: './menu-task-items.component.scss'
})
export class MenuTaskItemsComponent {
  // props
  title = input<string>("Item");
  quantity = input<number>(0);
  isSelected = input<boolean>(false);
  isCollapsed = input<boolean>(false);
  clickEventEmitter = output<void>();

  // methods
  onClick(): void {
    this.clickEventEmitter.emit();
  }
}
