import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NutriService {
    private apiUrl = 'http://127.0.0.1:9090/admin/users/';

    constructor(private http: HttpClient) {}

    getNutris(): Observable<any> {
        console.log(this.http.get<any>(this.apiUrl));
        return this.http.get<any>(this.apiUrl);
    }
}
