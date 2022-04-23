import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import jwt_decode from 'jwt-decode';
import {UserDto} from '../model/UserDto';
import {ChangePasswordRequest} from '../model/changePasswordRequest';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject = new BehaviorSubject<UserDto>(null);
    currentUser = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
    }

    createUser(createRequest: any): Observable<any> {
        return this.http.post(`/create-user`, createRequest, { responseType: 'text'});
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
                    this.currentUserSubject.next(user);
                    return user;
                })
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        return of({success: false});
    }

    changePassword(requestBody: ChangePasswordRequest): Observable<any> {
        return this.http.post('/change-password', requestBody, { responseType: 'text'});
    }
}
