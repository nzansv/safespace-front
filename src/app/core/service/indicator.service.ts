import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IndicatorService {
    private readonly GENERAL = '/business/indicator';

    constructor(private http: HttpClient, private router: Router) {
    }
    getIndicatorDetailsById(id): Observable<any>{
        return this.http.get(`${this.GENERAL}/user/all/${id}`);
    }

}
