import {Component, inject, type OnInit} from '@angular/core';
import {TaskModel} from './../../models/task.model';
import {TaskArrayService} from './../../services/task-array.service';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task!: TaskModel;
  private taskArrayService = inject(TaskArrayService);

  ngOnInit(): void {
    // create empty task to show at least empty form
    this.task = new TaskModel();
  }

  onSaveTask(): void {
    const task = {...this.task} as TaskModel;
    if (task.id) {
      this.taskArrayService.updateTask(task);
    } else {
      this.taskArrayService.createTask(task);
    }
  }

  onGoBack(): void {
  }
}
