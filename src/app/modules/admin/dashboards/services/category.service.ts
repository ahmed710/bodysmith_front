import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private baseUrl = 'http://localhost:9090/categorie';

    constructor(private http: HttpClient) {
    }

    getAllCategories(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    getCategoryById(id: string): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url);
    }

    addCategory(nom: string): Observable<any> {
        const body = {nom};
        return this.http.post(this.baseUrl, body);
    }

    updateCategory(id: string, nom: string): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        const body = {nom};
        return this.http.put(url, body);
    }

    deleteCategory(id: string): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url);
    }
}
