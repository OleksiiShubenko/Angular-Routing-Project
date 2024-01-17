import {Component, inject, type OnInit} from '@angular/core';
import {TaskModel} from './../../models/task.model';
import {TaskArrayService} from './../../services/task-array.service';
import {Input} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input({ alias: 'taskId'})
  id!: string; // pathParam

  task!: TaskModel;
  private taskArrayService = inject(TaskArrayService);

  private router = inject(Router)

  ngOnInit(): void {
    // create empty task to show at least empty form
    this.task = new TaskModel();

    this.taskArrayService.getTask(this.id)
      .then(task => {
        this.task = task ?? {} as TaskModel
      })
      .catch(err => console.log(err))
  }

  onSaveTask(): void {
    const task = {...this.task} as TaskModel;
    if (task.id) {
      this.taskArrayService.updateTask(task);
    } else {
      this.taskArrayService.createTask(task);
    }
    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(["/home"]);
  }
}
