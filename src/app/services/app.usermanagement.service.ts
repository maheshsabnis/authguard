import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RegisterUser, ResponseStatus, LoginUser, ApplicationRole, UserRole } from './../models/app.models';
//BehaviorSubject: Used to subscribe to values (data) contained by the Observable
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Users } from '../models/app.models';
@Injectable({
   providedIn: 'root'
})
export class UserManagementService {
  private url: string;
  public authenticatedUserSubject: BehaviorSubject<ResponseStatus>;
  public authenticatedUser: Observable<ResponseStatus>;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:5000';
    this.authenticatedUserSubject = new BehaviorSubject<ResponseStatus>(JSON.parse(localStorage.getItem('roleData')));
    this.authenticatedUser = this.authenticatedUserSubject.asObservable();
  }

  createUser(user: RegisterUser): Observable<ResponseStatus> {
     let response: Observable<ResponseStatus> = null;
     const options = {
       headers: new HttpHeaders({
          'Content-Type' : 'application/json'
       })
     };
     response = this.http.post<ResponseStatus>(`${this.url}/api/Security/post/register/user`, user, options);
     return response;
  }

  public get currentUserInfo(): ResponseStatus {
    return this.authenticatedUserSubject.value;
  }

  createRole(role: ApplicationRole, token: string): Observable<ResponseStatus> {
    let response: Observable<ResponseStatus> = null;
    const options = {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json',
          AUTHORIZATION: `Bearer ${token}`
        })
    };
    response = this.http.post<ResponseStatus>(`${this.url}/api/Security/post/role/create`, role, options);
    return response;
  }

  approveUser(userRole: UserRole, token: string): Observable<ResponseStatus> {
    let response: Observable<ResponseStatus> = null;
    const options = {
      headers: new HttpHeaders({
         'Content-Type' : 'application/json',
         AUTHORIZATION : `Bearer ${token}`
      })
    };
    response = this.http.post<ResponseStatus>(`${this.url}/api/Security/post/activate/user`, userRole, options);
    return response;
  }

  getRoles(token: string): Observable<ApplicationRole[]> {
    alert(`In roles service ${token}`);
    let response: Observable<ApplicationRole[]> = null;
    const options = {
      headers : new HttpHeaders({
        AUTHORIZATION : `Bearer ${token}`
      })
    };
    response = this.http.get<ApplicationRole[]>(`${this.url}/api/Security/roles/readall`, options);
    return response;
  }

  getUsers(token: string): Observable<Users[]> {
    alert(`In users service ${token}`);

    let response: Observable<Users[]> = null;
    const options = {
      headers : new HttpHeaders({
        AUTHORIZATION : `Bearer ${token}`
      })
    };
    response = this.http.get<Users[]>(`${this.url}/api/Security/users/readall`, options);
    return response;
  }

  authUser(user: LoginUser): Observable<ResponseStatus> {
    console.log(`In Service authuser method ${JSON.stringify(user)}`);
    const options = {
      headers: new HttpHeaders({
         'Content-Type' : 'application/json'
      })
    };
    return this.http.post<ResponseStatus>(`${this.url}/api/Security/post/auth/user`,
     user, options).pipe(map((resp) => {
      console.log(`in service response ${alert(JSON.stringify(resp))}`);
      if (resp && resp.Token) {
        console.log(`in service in if response ${JSON.stringify(resp)}`);
        // store user details and jwt token in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem('roleInfo', resp.Token);
        localStorage.setItem('userName', resp.UserName);
        localStorage.setItem('roleName', resp.Role);
        this.authenticatedUserSubject.next(resp);
      }
      return resp;
    }));
  }

  logout(): void {
    localStorage.clear();
    this.authenticatedUserSubject.next(null);
  }
}
