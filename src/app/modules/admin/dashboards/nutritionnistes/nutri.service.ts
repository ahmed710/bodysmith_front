import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NutriService {
    private apiUrl = 'http://127.0.0.1:9090/admin/nutritionnistes/';

    constructor(private http: HttpClient) {}

    getNutris(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
