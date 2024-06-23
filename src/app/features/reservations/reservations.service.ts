import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private baseUrl = 'http://localhost:9090/reservation'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getReservationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, reservation);
  }

  updateReservation(id: string, reservation: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, reservation);
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
