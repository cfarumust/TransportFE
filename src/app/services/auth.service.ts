import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router} from '@angular/router';
import { FormService } from './form-service.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public AUTH_SERVER_ADDRESS = 'https://www.mishnmash.de';
    public authSubject = new BehaviorSubject(false);

    constructor(private httpClient: HttpClient, public router: Router, public formService: FormService) { }

    register(user, loginName: string): Observable<any> {
        return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/${loginName}/register`, user, this.formService.getHeaders());
    }

    login(user: any, loginName: string): Observable<any> {
        return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/${loginName}`, user, this.formService.getHeaders()).pipe(
            tap(async (res: any) => {
                if (res.success) {
                    const userId = loginName === 'clientlogin' ? 'nclientid' : 'nshipperid';
                    localStorage.setItem('ACCESS_TOKEN', res.token);
                    localStorage.setItem(userId, res[userId]);
                    this.authSubject.next(true);
                }
            })
        );
    }

    async logout() {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('nclientid');
        localStorage.removeItem('nshipperid');
        this.authSubject.next(false);
        this.router.navigate(['/home']);
    }

    isLoggedIn(): Observable<boolean> {
        return this.authSubject.asObservable();
    }

}
