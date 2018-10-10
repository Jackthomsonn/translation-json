import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  public login = (user: IUser) => {
    return this.http.post('api/auth/login', user);
  }

  public register = (user: IUser) => {
    return this.http.post('api/auth/register', user);
  }

  public resetPassword = (user: IUser) => {
    const { email } = user;

    return this.http.post('api/auth/reset-password-request', { email });
  }

  public updatePassword = (user: IUser, token: string) => {
    const { email, password } = user;

    return this.http.post('api/auth/update-password', { email, password }, {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`
      })
    });
  }

  public changePassword = (user: IUser) => {
    return this.http.post('api/auth/change-password', user);
  }

  public logout = () => {
    this.cookieService.delete('translation-json-access');

    this.router.navigate(['login']);
  }

  public getToken = () => {
    return this.cookieService.get('translation-json-access');
  }

  public getRefreshToken = () => {
    return this.http.post('api/auth/refreshtoken', { token: this.getToken() });
  }
}
