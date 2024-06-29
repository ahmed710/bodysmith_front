import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatService {
  private apiUrl = 'http://localhost:9090/plat';

  constructor(private http: HttpClient) {}

  getAllPlats(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addPlat(plat: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, plat);
  }

  updatePlat(id: string, plat: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, plat);
  }

  deletePlat(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getPlatById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  findPlatsWithinCalories(
    minCalories: number,
    maxCalories: number
  ): Observable<any[]> {
    const params = new HttpParams()
      .set('maxCalories', maxCalories.toString())
      .set('minCalories', minCalories.toString());
    return this.http.get<any[]>(`${this.apiUrl}/find-within-calories`, {
      params,
    });
  }
}
