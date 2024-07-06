import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


 
  export class CoachesService {
    private baseUrl = 'http://127.0.0.1:9090/admin/coach/';
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    constructor(private http: HttpClient) { }

  // getCoaches(): Observable<any[]> {
  //   return this.http.get<any[]>(this.baseUrl);
  // }
  getCoaches(): Observable<any[]> {
    const token = localStorage.getItem('authToken'); 
    if (!token) {
        console.error('No auth token found in localStorage');

        return new Observable(observer => {
          observer.error('No auth token found');
          observer.complete();
        });
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    console.log(token);

    console.log('Token:', token);
    console.log('Headers:', headers);

    return this.http.get<any>('http://127.0.0.1:9090/admin/coaches/', { headers }).pipe(
      map(response => response.coaches)
    );
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
