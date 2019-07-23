import { Component, OnInit } from '@angular/core';
import { Task } from '../../Models/task'
import { TaskServiceService } from '../../Service/task-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  Task: string;
  Priority: number;
  ParentTask: string;
  StartDate: Date;
  EndDate: Date;
  ParentTaskList: string[];
  obj: Task;
  showTaskReqError: boolean;
  showStDateReqError: boolean;
  showEndDateReqError: boolean;
  minDate: string;

  constructor(private _taskService: TaskServiceService, private router: Router) {
    debugger;
    this.Priority = 0;
    this.minDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    this.GetParentTasks();
  }

  GetParentTasks() {
    this._taskService.GetParentTasks()
      .subscribe(res => {
        this.ParentTaskList = res;
      });
  }

  ResetTask() {
    this.Task = undefined;
    this.ParentTask = undefined;
    this.Priority = 0;
    this.StartDate = undefined;
    this.EndDate = undefined;
  }

  AddTask() {
    this.obj = new Task();
    var error = false;
    if (this.Task) {
      this.obj.Task = this.Task;
      this.showTaskReqError = false;
    }
    else {
      this.showTaskReqError = true;
      error = true;
    }
    this.obj.ParentTask = this.ParentTask;
    this.obj.Priority = this.Priority;
    if (this.StartDate) {
      this.obj.StartDate = this.StartDate;
      this.showStDateReqError = false;
    }
    else {
      this.showStDateReqError = true;
      error = true;
    }
    if (this.EndDate) {
      this.obj.EndDate = this.EndDate;
      this.showEndDateReqError = false;
    }
    else {
      this.showEndDateReqError = true;
      error = true;
    }
    if (!error) {
      this._taskService.AddTask(this.obj)
        .subscribe((data: any) => {
          console.log(data);
          this.router.navigate(['/view']);
        },
          function (error) {
            console.log(error);
          },
          function () {
            console.log('patyu');
          });
    }
  }

}
