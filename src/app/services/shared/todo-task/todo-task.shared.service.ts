import { Injectable } from '@angular/core';
import { TodoTask } from '../../../models/todo-task/todo-task/todo-task.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoTaskSharedService {
  _todoTaskSubject: Subject<Array<TodoTask>> = new Subject<Array<TodoTask>>();
  todoTask$: Observable<Array<TodoTask>> = this._todoTaskSubject.asObservable();

  constructor() { }

  setTodoTasks(todoTask: Array<TodoTask>): void {
    this._todoTaskSubject.next(todoTask);
  }

  getTodoTasks(): Observable<Array<TodoTask>> {
    return this.todoTask$;
  }
}
