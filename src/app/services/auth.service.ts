import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ErrorHandler } from './errorHandler.service';
import { Router} from '@angular/router';
import { FormService } from './form-service.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public AUTH_SERVER_ADDRESS = 'https://www.mishnmash.de';
    public authSubject = new BehaviorSubject(false);

    constructor(private httpClient: HttpClient, private storage: Storage,
                private errorHandler: ErrorHandler, public router: Router, public formService: FormService) { }

    register(user): Observable<any> {
        return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/register`, user, this.formService.getHeaders()).pipe(
            catchError(this.errorHandler.handleError)
        );
    }

    login(user: any): Observable<any> {
        return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/clientlogin`, user, this.formService.getHeaders()).pipe(
            tap(async (res: any) => {
                await this.storage.set('ACCESS_TOKEN', res.token);
                await this.storage.set('NCLIENTID', res.nclientid);
                this.authSubject.next(true);
            }),
            catchError(this.errorHandler.handleError)
        );
    }

    async logout() {
        await this.storage.remove('ACCESS_TOKEN');
        await this.storage.remove('NCLIENTID');
        this.authSubject.next(false);
        this.router.navigateByUrl('/login');
    }

    isLoggedIn(): Observable<boolean> {
        return this.authSubject.asObservable();
    }

}
