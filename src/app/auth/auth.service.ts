import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResult } from './login-result';
// Remove the .development later
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authStatus = new BehaviorSubject<boolean>(false);
  authStatus = this._authStatus.asObservable();

  constructor(private http: HttpClient) { }

  private setAuthStatus(state: boolean) : void {
    this._authStatus.next(state);
  }

  login(loginRequest: LoginRequest): Observable<LoginResult> {
    let url = `${environment.baseUrl}api/admin/login`;
    return this.http.post<LoginResult>(url, loginRequest)
      .pipe(tap(loginResult => {
        if(loginResult.success)
          localStorage.setItem("c584_jwt", loginResult.token);
          this.setAuthStatus(true);
      }));
  }

  logout(): void {
    //if(localStorage.getItem("c584_jwt"))
    localStorage.removeItem("c584_jwt");
    this.setAuthStatus(false);
  }

  isAuthenticated() {
    return localStorage.getItem("c584_jwt") != null;
  }
}
