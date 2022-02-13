import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly GENERAL = '/business/task';

  constructor(private http: HttpClient, private router: Router) {
  }
  getAllTasks(params): Observable<any>{
    return this.http.get(`${this.GENERAL}/all?${params}`);
  }
  createTask(task): Observable<any> {
    return this.http.post(this.GENERAL, task);
  }
}
