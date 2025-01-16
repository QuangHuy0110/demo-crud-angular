import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { apiURL } from '../Constants/url';
import { User } from '../Types';
import { Router } from '@angular/router';
import { 
  AbilityBuilder, 
  createMongoAbility, 
  MongoAbility, 
  PureAbility,
  Ability
} from '@casl/ability';
export interface RegisterRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin: boolean = false;
  users: User[];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ability: Ability  // Changed this line - removing @Inject decorator
  ) {}

  register(params: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(`${apiURL}/user`, params).pipe(delay(3000));
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${apiURL}/user`);
  }

  login(params: RegisterRequest): Observable<boolean> {
    return this.getUsers().pipe(
      delay(3000),
      map(users => {
        const user = users.find(u => u.email === params.email && u.password === params.password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.updateAbility(user);
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
    return this.isLogin;
  }

  private updateAbility(user: User) {
    const { can, rules } = new AbilityBuilder(Ability);

    if (user.role === 'admin') {
      can('manage', 'all');
    } else {
      can('read', 'all');
    }

    this.ability.update(rules);
  }
}