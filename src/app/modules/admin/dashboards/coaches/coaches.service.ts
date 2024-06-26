// coach.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CoachService {
    private apiUrl = 'http://127.0.0.1:9090/admin/coaches/';

    constructor(private http: HttpClient) {}

    getCoaches(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
