import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoSubtask } from '../../models/todo-subtask/todo-subtask/todo-subtask';

@Component({
  selector: 'app-subtask',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss'
})
export class SubtaskComponent {
  // props
  subtasksList = input<Array<TodoSubtask>>([]);
  doneSubtaskEventEmitter = output<TodoSubtask>();
  newSubtask: string = "";
  addNewSubtaskEventEmitter = output<string>();
  deleteSubtaskEventEmitter = output<string>();
  
  // methods
  toggleDoneSubtask(e: Event, name: string, id: string): void {
    this.doneSubtaskEventEmitter.emit({
      id: id,
      name: name,
      isDone: (e.target as HTMLInputElement).checked
    });
  }

  resetNewSubtaskInputValue(): void {
    this.newSubtask = "";
  }

  addNewSubtask(): void {
    this.addNewSubtaskEventEmitter.emit(this.newSubtask);
    this.resetNewSubtaskInputValue();
  }

  deleteSubtask(name: string): void {
    this.deleteSubtaskEventEmitter.emit(name);
  }
}
