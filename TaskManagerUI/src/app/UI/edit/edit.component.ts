import { Component, OnInit } from '@angular/core';
import { Task } from '../../Models/task'
import { TaskServiceService } from '../../Service/task-service.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  Task: string;
  Priority: number;
  ParentTask: string;
  StartDate: Date;
  EndDate: Date;
  taskId: number;
  obj: Task;
  ParentTaskList: string[];
  private sub: any;
  showTaskReqError: boolean;
  showStDateReqError: boolean;
  showEndDateReqError: boolean;
  minDate: string;

  constructor(private _taskService: TaskServiceService, private route: ActivatedRoute, private router: Router) {
    this.minDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.taskId = +params["id"];
    });
    this.GetTaskById(this.taskId);
    this.GetParentTasks();
  }

  GetParentTasks() {
    this._taskService.GetParentTasks()
      .subscribe(res => {
        this.ParentTaskList = res;
      });
  }

  GetTaskById(taskId) {
    this._taskService.GetTaskById(taskId)
      .subscribe(res => {
        this.obj = res;
        if (this.obj != undefined) {
          this.Task = this.obj.Task;
          this.Priority = this.obj.Priority;
          this.ParentTask = this.obj.ParentTask;
          this.StartDate = this.obj.StartDate;
          this.EndDate = this.obj.EndDate;
        }
      });
  }

  UpdateTask() {
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
    this.obj.TaskID = this.taskId;
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
      this._taskService.UpdateTask(this.obj)
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
