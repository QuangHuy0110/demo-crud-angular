import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from '../Constants/url';

export interface RegisterRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggin: boolean = false
  constructor(private httpClient: HttpClient) {

  }

  register(params: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(`${apiURL}/register`, params)
  }
}
