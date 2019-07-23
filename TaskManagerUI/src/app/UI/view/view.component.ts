import { Component, OnInit } from '@angular/core';
import { Task } from '../../Models/task';
import { appRoutes } from '../../app.routes';
import { TaskServiceService } from '../../Service/task-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  Task: string;
  PriorityFrom: number;
  PriorityTo: number;
  ParentTask: string;
  StartDate: Date;
  EndDate: Date;
  list: Task[];
  filteredList: Task[];

  constructor(private _taskService: TaskServiceService, private router: Router) { }

  ngOnInit() {
    this.GetTask();
  }

  GetTask() {
    this._taskService.GetTask()
      .subscribe(res => {
        this.list = res;
        this.assignCopy();
      });
  }

  assignCopy() {
    this.filteredList = Object.assign([], this.list);
  }

  filterItem() {
    debugger;
    if (!this.Task && !this.ParentTask && !this.PriorityFrom && !this.PriorityTo && !this.StartDate && this.EndDate) this.assignCopy();
    this.filteredList = Object.assign([], this.list).filter(
      item => (this.Task != undefined ? item.Task.toLowerCase().indexOf(this.Task.toLowerCase()) > -1 : true) &&
        (this.ParentTask != undefined ? item.ParentTask.toLowerCase().indexOf(this.ParentTask.toLowerCase()) > -1 : true) &&
        (this.PriorityFrom != undefined ? item.Priority >= this.PriorityFrom : true) &&
        (this.PriorityTo != undefined ? item.Priority <= this.PriorityTo : true) &&
        (this.StartDate != undefined ? item.StartDate.indexOf(this.StartDate) > -1 : true) &&
        (this.EndDate != undefined ? item.EndDate.indexOf(this.EndDate) > -1 : true)
    )
  }

  EndTask(taskID) {
    this._taskService.EndTask(taskID)
      .subscribe((data: any) => {
        console.log(data);
        window.location.reload();
      },
        function (error) {
          console.log(error);
        },
        function () {
          console.log('patyu');
        });
  }

}
