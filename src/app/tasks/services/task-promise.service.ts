import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import type {TaskModel} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskPromiseService {

  //url provided by json-server
  private tasksUrl = 'http://localhost:3000/tasks';
  private http = inject(HttpClient);

  getTasks(): Promise<TaskModel[]> {
    const request$ = this.http.get(this.tasksUrl);
    return firstValueFrom(request$)
      .then(response => response as TaskModel[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
