import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly GENERAL = '/business/department';

  constructor(private http: HttpClient, private router: Router) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.GENERAL}/get/all`);
  }
}
