import { inject, Injectable } from '@angular/core';
import * as globalVars from '../../../global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoTask } from '../../models/todo-task/todo-task/todo-task.model';
import { AllTodoTasksResDto } from '../../models/todo-task/all-todo-tasks-res-dto/all-todo-tasks-res-dto.model';
import { UpdateTodoTaskResDto } from '../../models/todo-task/update-todo-task-res-dto/update-todo-task-res-dto';

@Injectable({
  providedIn: 'root'
})
export class TodoTaskService {

  constructor() { }

  apiUrl: string = globalVars.domain + '/todoTask';
  private http: HttpClient = inject(HttpClient);

  getAll(userId: string, filter?: 'Today' | 'Upcoming' | 'Done' | 'Important', isDeleted: boolean = false, search?: string): Observable<AllTodoTasksResDto> {
    let fullApiUrl = this.apiUrl;

    if (!search) {
      fullApiUrl += `/all?userId=${userId}&filter=${filter}&isDeleted=${isDeleted}`;
    } else {
      fullApiUrl += `/all?userId=${userId}&search=${search}`;
    }

    return this.http.get<AllTodoTasksResDto>(fullApiUrl);
  }

  getDetails(id: string): Observable<any> {
    let fullApiUrl = this.apiUrl + `/details?id=${id}`;

    return this.http.get<any>(fullApiUrl);
  }

  update(todoTask: TodoTask): Observable<UpdateTodoTaskResDto> {
    let fullApiUrl = this.apiUrl + "/update";

    return this.http.post<UpdateTodoTaskResDto>(fullApiUrl, todoTask);
  }
}
