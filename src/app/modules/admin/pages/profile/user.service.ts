import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    getUserProfile(userId: string, role: string): Observable<any> {
        const baseUrl = 'http://127.0.0.1:9090';
        const url = `${baseUrl}/${role.toLowerCase()}/${userId}`;
        console.log(userId);
        console.log(role.toLowerCase());

        return this.http.get(url);
    }
    updateUserProfile(userId: string, userData: any) {
        const baseUrl = 'http://127.0.0.1:9090';
        const url = `${baseUrl}/${userData.role.toLowerCase()}/${userId}`;
        return this.http.put(`${url}`, userData);
    }
}
