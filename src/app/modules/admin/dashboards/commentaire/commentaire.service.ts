import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommentaireService {
    private apiUrl = 'http://127.0.0.1:9090/service/';

    constructor(private http: HttpClient) {}

    getData(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    addService(service: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, service);
    }

    updateService(serviceId: string, updatedService: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${serviceId}`, updatedService);
    }

    deleteService(serviceId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${serviceId}`);
    }

    searchServices(key: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/search/${key}`);
    }
}
