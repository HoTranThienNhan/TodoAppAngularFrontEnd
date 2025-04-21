import { AfterViewInit, Component, ElementRef, input, model, output, ViewChild } from '@angular/core';
import { TagComponent } from "../../tag/tag.component";
import { DragScrollDirective } from '../../../directives/drag-scroll/drag-scroll.directive';
import { FormsModule } from '@angular/forms';
import { Tag } from '../../../models/tag/tag/tag.model';

@Component({
  selector: 'app-task-item',
  imports: [TagComponent, DragScrollDirective, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent implements AfterViewInit {
  // props
  content = input<string>("Task content");
  subtaskQuantity = input<number>(0);
  tags = input<Array<Tag>>([]);
  isDone = input<boolean>(false);
  isImportant = model<boolean>(false);
  isSelectedItem = input<boolean>(false);
  taskItemEventEmitter = output<void>();
  doneTaskEventEmitter = output<boolean>();
  importantTaskEventEmitter = output<boolean>();

  // hooks
  @ViewChild("importantEl") importantEl!: ElementRef;
  @ViewChild("taskItemContent") taskItemContentEl!: ElementRef;
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
    // emit isImportant
    this.isImportant.set(!this.isImportant());
    this.importantTaskEventEmitter.emit(this.isImportant());
  }

  checkAsDone(e: Event): void {
    this.doneTaskEventEmitter.emit((e.target as HTMLInputElement).checked);
  }

  openTaskItemDetails(): void {
    this.taskItemEventEmitter.emit();
    this.taskItemContentEl.nativeElement.classList.add("selected");
  }
}
