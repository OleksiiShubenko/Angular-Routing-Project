import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  getTask(id: NonNullable<TaskModel['id']> | string): Promise<TaskModel> {
    const url = `${this.tasksUrl}/${id}`;

    const request$ = this.http.get(url);
    return firstValueFrom(request$)
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  async createTask(task$: TaskModel): Promise<TaskModel> {
    const url = this.tasksUrl;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    const id = await this.generateId();

    let task = {...task$, id: id}

    const request$ = this.http.post(url, task, options);
    return firstValueFrom(request$)
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  private async generateId(): Promise<number> {
    return this.getTasks()
      .then(tasks => {
        if (tasks.length == 0) {
          return 1;
        }
        return 1 + Number(tasks[tasks.length - 1].id!!);
      })
  }

  updateTask(task: TaskModel): Promise<TaskModel> {
    const url = `${this.tasksUrl}/${task.id}`;
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const request$ = this.http.put(url, task, options);
    return firstValueFrom(request$)
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
