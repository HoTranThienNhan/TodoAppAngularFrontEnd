import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-menu-task-items',
  imports: [],
  templateUrl: './menu-task-items.component.html',
  styleUrl: './menu-task-items.component.scss'
})
export class MenuTaskItemsComponent {
  // props
  title = input<string>("Item");
  quantity = input<number>(0);
  isSelected = input<boolean>(false);
  clickEventEmitter = output<void>();

  // methods
  onClick(): void {
    this.clickEventEmitter.emit();
  }
}
