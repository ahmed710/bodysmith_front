import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private apiUrl = 'http://localhost:9090/restaurant';

  constructor(private http: HttpClient) {}

  getAllRestaurants(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getRestaurantById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addRestaurant(restaurant: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, restaurant);
  }

  updateRestaurant(id: string, restaurant: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, restaurant);
  }

  deleteRestaurant(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  searchRestaurantsByAddress(searchString: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/adresse?searchString=${searchString}`
    );
  }

  findNearbyRestaurants(
    latitude: number,
    longitude: number,
    maxDistance: number
  ): Observable<any[]> {
    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString())
      .set('maxDistance', maxDistance.toString());
    return this.http.get<any[]>(`${this.apiUrl}/nearby`, {
      params,
    });
  }
}
