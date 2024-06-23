
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:9090/auth/login/'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environments';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   login(credentials: { email: string, password: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/auth/login`, credentials);
//   }

//   register(data: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/auth/register`, data);
//   }

//   storeToken(token: string): void {
//     localStorage.setItem('authToken', token);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('authToken');
//   }

//   removeToken(): void {
//     localStorage.removeItem('authToken');
//   }
// }
