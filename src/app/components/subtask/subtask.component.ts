import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subtask',
  imports: [FormsModule],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss'
})
export class SubtaskComponent {
  // props
  subtasksList = input<Array<{'id': string, 'name': string, 'isDone': boolean}>>([]);
  doneSubtaskEventEmitter = output<{'id': string, 'isDone': boolean}>();
  newSubtask: string = "";
  addNewSubtaskEventEmitter = output<string>();
  deleteSubtaskEventEmitter = output<string>();
  
  // methods
  toggleDoneSubtask(e: Event, id: string): void {
    this.doneSubtaskEventEmitter.emit({
      'id': id,
      'isDone': (e.target as HTMLInputElement).checked
    });
  }

  addNewSubtask(): void {
    this.addNewSubtaskEventEmitter.emit(this.newSubtask);
    this.newSubtask = "";
  }

  deleteSubtask(id: string): void {
    this.deleteSubtaskEventEmitter.emit(id);
  }
}
