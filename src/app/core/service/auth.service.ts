import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import jwt_decode from 'jwt-decode';
import {UserDto} from '../model/UserDto';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<UserDto>;
    public currentUser: Observable<UserDto>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserDto>(
            JSON.parse(localStorage.getItem('currentUser'))
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(username: string, password: string): Observable<any>{
        return this.http
            .post(`/login`,
                {
                    username,
                    password
                },
                { responseType: 'text'}
            ).pipe(
                map((token) => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    const userData: any = jwt_decode(token);
                    const user: UserDto = new UserDto();
                    user.id = userData.id;
                    user.username = userData.sub;
                    user.role = userData.role;
                    user.token = token;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('role', JSON.stringify(user.role));
                    this.currentUserSubject.next(user);
                    return user;
                })
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('role');
        this.currentUserSubject.next(null);
        return of({success: false});
    }
}
