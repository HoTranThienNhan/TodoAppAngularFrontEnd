import { AfterViewInit, Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { TagComponent } from "../../tag/tag.component";
import { DragScrollDirective } from '../../../directives/drag-scroll/drag-scroll.directive';

@Component({
  selector: 'app-task-item',
  imports: [TagComponent, DragScrollDirective],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent implements AfterViewInit {
  // props
  content = input<string>("Task content");
  subtaskQuantity = input<number>(0);
  tags = input<Array<string>>([]);
  isDone = input<boolean>(false);
  isImportant = input<boolean>(false);
  isSelectedItem = input<boolean>(false);
  taskItemEventEmitter = output<void>();

  // hooks
  @ViewChild("importantEl") importantEl!: ElementRef;
  ngAfterViewInit(): void {

  }
  
  // methods
  checkAsImportant(): void {
    // important element
    if (this.importantEl.nativeElement.classList.contains('checked')) {
      this.importantEl.nativeElement.classList.remove('checked');
    } else {
      this.importantEl.nativeElement.classList.add('checked');
    }
  }

  openTaskItemDetails(): void {
    this.taskItemEventEmitter.emit();
  }
}
