import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { apiURL } from '../Constants/url';
import { User } from '../Types';
import { Router } from '@angular/router';

export interface RegisterRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin: boolean = false
  users: any[]
  constructor(private httpClient: HttpClient, private router: Router) {

  }

  register(params: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(`${apiURL}/user`, params).pipe(delay(3000))
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${apiURL}/user`)
  }

  login(params: RegisterRequest): Observable<boolean> {
    return this.getUsers().pipe(
      delay(3000),
      map(users => {
        const user = users.find(u => u.email === params.email && u.password === params.password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.isLogin = true;
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isLogin = false;
  }

  checkLogin(): boolean {
    return this.isLogin
  }
}
