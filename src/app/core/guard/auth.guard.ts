import {Injectable} from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import {AuthService} from '../service/auth.service';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (JSON.parse(localStorage.getItem('currentUser'))) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
