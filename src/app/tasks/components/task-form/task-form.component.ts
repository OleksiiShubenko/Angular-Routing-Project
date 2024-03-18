import {Component, inject, type OnInit} from '@angular/core';
import {TaskModel} from '../../models/task.model';
import {TaskPromiseService} from '../../services';
import {Input} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input({alias: 'taskId'})
  id!: string | undefined; // pathParam

  task!: TaskModel;
  private taskPromiseService = inject(TaskPromiseService);

  private router = inject(Router)

  ngOnInit(): void {
    // create empty task to show at least empty form
    this.task = new TaskModel();

    if (this.id) {
      this.taskPromiseService
        .getTask(this.id)
        .then((task) => {
          this.task = task ?? ({} as TaskModel);
        })
        .catch((err) => console.log(err));
    } else {
      this.task = new TaskModel();
    }
  }

  onSaveTask(): void {
    const task = {...this.task} as TaskModel;

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.onGoBack())
      .catch(err => console.log(err));
  }

  onGoBack(): void {
    this.router.navigate(["/home"]);
  }
}
