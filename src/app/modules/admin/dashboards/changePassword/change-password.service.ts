import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class ChangePasswordService {
    private apiUrl = 'http://127.0.0.1:9090/admin/changepassword';

    constructor(private http: HttpClient, private authService: AuthService) {}

    changePassword(
        userId: string,
        passwordData: {
            currentpassword: string;
            password: string;
            passwordconfirm: string;
        }
    ): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.authService.accessToken}`,
        });

        return this.http.put(`${this.apiUrl}/${userId}`, passwordData, {
            headers,
        });
    }
}
