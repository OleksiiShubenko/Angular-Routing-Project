import {Component, inject, type OnInit} from '@angular/core';
import {TaskArrayService} from './../../services/task-array.service';
import type {TaskModel} from './../../models/task.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
  // imports: [AsyncPipe]
})
export class TaskListComponent implements OnInit {
  tasks!: Promise<Array<TaskModel>>;
  private taskArrayService = inject(TaskArrayService);
  private router = inject(Router)

  ngOnInit(): void {
    this.tasks = this.taskArrayService.getTasks();
  }

  onCompleteTask(task: TaskModel): void {
    const updatedTask = {...task, done: true};
    this.taskArrayService.updateTask(updatedTask);
  }

  // navigation to edit form
  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id]
    this.router.navigate(link)
  }
}
