import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NutriService {
    private apiUrl = 'http://127.0.0.1:9090/admin/users/';
    private apiUrlDelete = 'http://127.0.0.1:9090/admin/';

    constructor(private http: HttpClient) {}

    getNutris(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
    removeCoach(coachId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrlDelete}${coachId}`);
    }
    deactivateCoach(coachId: string): Observable<any> {
        return this.http.put<any>(
            `${this.apiUrlDelete}desactivate/${coachId}`,
            {}
        );
    }

    reactivateCoach(coachId: string): Observable<any> {
        return this.http.put<any>(
            `${this.apiUrlDelete}reactivate/${coachId}`,
            {}
        );
    }
}
