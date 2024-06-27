import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachesService {
  private baseUrl = 'http://127.0.0.1:9090/admin/coaches/'; // Replace with your actual API URL
  // private baseUrl = 'http://127.0.0.1:9090/coach/'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }


  getCoaches(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getCoachById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createCoach(coach: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, coach);
  }

  updateCoach(id: string, coach: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, coach);
  }

  deleteCoach(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
