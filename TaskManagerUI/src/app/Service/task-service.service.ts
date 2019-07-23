import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import 'rxjs/Rx'
import { Observable } from 'rxjs'
import { error } from 'util';
import { Task } from '../Models/task'

@Injectable()
export class TaskServiceService {
  constructor(private _http: Http) {

  }
  addUrl: string = "http://localhost:50070/api/Task/AddTask";
  updateUrl: string = "http://localhost:50070/api/Task/UpdateTask";
  getUrl: string = "http://localhost:50070/api/Task/GetTasks";
  getParentTaskUrl: string = "http://localhost:50070/api/Task/GetParentTasks";
  endTaskUrl: string = "http://localhost:50070/api/Task/EndTask";

  GetTask(): Observable<Task[]> {
    return this._http.get(this.getUrl)
      .map(response => { return response.json() })
      .catch(error => Observable.throw(error))
  }

  GetParentTasks(): Observable<string[]> {
    return this._http.get(this.getParentTaskUrl)
      .map(response => { return response.json() })
      .catch(error => Observable.throw(error))
  }

  GetTaskById(taskId): Observable<Task> {
    return this._http.get(this.getUrl + '/' + taskId)
      .map(response => { return response.json() })
      .catch(error => Observable.throw(error))
  }

  AddTask(task) {
    let body = JSON.stringify(task);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.addUrl, body, options)
      .catch(error => Observable.throw(error));
  }

  UpdateTask(task) {
    let body = JSON.stringify(task);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.updateUrl, body, options)
      .map(response => {
        return response.json()
      })
      .catch(error => Observable.throw(error));
  }

  EndTask(taskId) {
    let body = JSON.stringify(taskId);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.endTaskUrl, body, options)
      .map(response => { return response.json() })
      .catch(error => Observable.throw(error));
  }
}
