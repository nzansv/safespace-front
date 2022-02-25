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
    getByUserIdAndIsLast(id): Observable<any>{
        return this.http.get(`${this.GENERAL}/user/last/${id}`);
    }
    getByDateAndUserIdAndPagination(id, dateFrom, dateTo, params): Observable<any>{
        return this.http.get(`${this.GENERAL}/user/date/userId/${dateFrom}/${dateTo}/${id}?${params}`);
    }
    getAvgIndicatorDetailsById(id): Observable<any>{
        return this.http.get(`${this.GENERAL}/user/all/avg/${id}`);
    }

}
