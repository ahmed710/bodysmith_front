import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategorieRestaurantService {
  private apiUrl = 'http://localhost:9090/categorieRestaurant';

  constructor(private http: HttpClient) {}

  getAllCategorieRestaurants(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  addCategorieRestaurant(categorieRestaurant: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, categorieRestaurant);
  }

  updateCategorieRestaurant(
    id: string,
    categorieRestaurant: any
  ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, categorieRestaurant);
  }

  deleteCategorieRestaurant(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getCategorieRestaurantById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
