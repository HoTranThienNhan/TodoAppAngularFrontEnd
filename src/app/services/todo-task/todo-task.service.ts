import { inject, Injectable } from '@angular/core';
import * as globalVars from '../../../global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoTask } from '../../models/todo-task/todo-task/todo-task.model';
import { AllTodoTasksResDto } from '../../models/todo-task/all-todo-tasks-res-dto/all-todo-tasks-res-dto.model';
import { UpdateTodoTaskResDto } from '../../models/todo-task/update-todo-task-res-dto/update-todo-task-res-dto.model';
import { AddTodoTaskResDto } from '../../models/todo-task/add-todo-task-res-dto/add-todo-task-res-dto.model';

@Injectable({
  providedIn: 'root'
})
export class TodoTaskService {

  constructor() { }

  apiUrl: string = globalVars.domain + '/todoTask';
  private http: HttpClient = inject(HttpClient);

  getAll(userId: string, filter?: 'Today' | 'Upcoming' | 'Done' | 'Important', isDeleted: boolean = false, search?: string): Observable<AllTodoTasksResDto> {
    let fullApiUrl = this.apiUrl + `/all?userId=${userId}`;

    if (search) {
      fullApiUrl += `&search=${search}`;
    } else {
      if (filter) {
        fullApiUrl += `&filter=${filter}`;
      }
      if (isDeleted) {
        fullApiUrl += `&isDeleted=${isDeleted}`;
      }
    }

    return this.http.get<AllTodoTasksResDto>(fullApiUrl);
  }

  getDetails(id: string): Observable<TodoTask> {
    let fullApiUrl = this.apiUrl + `/details?id=${id}`;

    return this.http.get<TodoTask>(fullApiUrl);
  }

  add(todoTask: TodoTask): Observable<AddTodoTaskResDto> {
    let fullApiUrl = this.apiUrl + `/add`;

    return this.http.post<AddTodoTaskResDto>(fullApiUrl, todoTask);
  }

  update(todoTask: TodoTask): Observable<UpdateTodoTaskResDto> {
    let fullApiUrl = this.apiUrl + "/update";

    return this.http.post<UpdateTodoTaskResDto>(fullApiUrl, todoTask);
  }

  delete(id: string): Observable<any> {
    let fullApiUrl = this.apiUrl +  `/delete?id=${id}`;

    return this.http.delete<any>(fullApiUrl);
  }
}
