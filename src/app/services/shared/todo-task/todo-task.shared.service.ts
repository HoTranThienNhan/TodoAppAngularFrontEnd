import { Injectable } from '@angular/core';
import { TodoTask } from '../../../models/todo-task/todo-task/todo-task.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoTaskSharedService {
  _todoTaskSubject: Subject<TodoTask> = new Subject<TodoTask>();
  todoTask$: Observable<TodoTask> = this._todoTaskSubject.asObservable();

  constructor() { }

  setTodoTask(todoTask: TodoTask): void {
    this._todoTaskSubject.next(todoTask);
  }
}
