import {Component, inject, type OnInit} from '@angular/core';
import {TaskArrayService} from '../../services';
import type {TaskModel} from '../../models/task.model';
import {Router} from "@angular/router";
import {TaskPromiseService} from "../../services";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
  // imports: [AsyncPipe]
})
export class TaskListComponent implements OnInit {
  tasks!: Promise<Array<TaskModel>>;

  private taskArrayService = inject(TaskArrayService);
  private taskPromiseService = inject(TaskPromiseService);

  private router = inject(Router)

  ngOnInit(): void {
    //tasks returned in Promise, and subscription will be done be async pipe
    this.tasks = this.taskPromiseService.getTasks();
  }

  onCompleteTask(task: TaskModel): void {
    const updatedTask = {...task, done: true};
    this.updateTask(updatedTask)
      .catch(err => console.log(err));
  }

  onCreateTask(): void {
    const link = ['/add'];
    this.router.navigate(link);
  }

  // navigation to edit form
  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id]
    this.router.navigate(link)
  }

  private async updateTask(task: TaskModel) {
    const updatedTask = await this.taskPromiseService.updateTask({...task, done: true})

    const tasks: TaskModel[] = await this.tasks;
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    tasks[index] = {...updatedTask};
  }
}
