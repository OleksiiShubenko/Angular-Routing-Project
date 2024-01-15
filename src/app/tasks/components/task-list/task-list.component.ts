import {Component, inject, type OnInit} from '@angular/core';
import {TaskArrayService} from './../../services/task-array.service';
import type {TaskModel} from './../../models/task.model';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
  // imports: [AsyncPipe]
})
export class TaskListComponent implements OnInit {
  tasks!: Promise<Array<TaskModel>>;
  private taskArrayService = inject(TaskArrayService);

  ngOnInit(): void {
    this.tasks = this.taskArrayService.getTasks();
  }

  onCompleteTask(task: TaskModel): void {
    const updatedTask = {...task, done: true};
    this.taskArrayService.updateTask(updatedTask);
  }

  onEditTask(task: TaskModel): void {
  }
}
