import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = 'http://localhost:9090/produit';

    constructor(private http: HttpClient) {
    }

    getProducts(idCategorie?: string, minPrice?: number, avgPrice?: number, maxPrice?: number): Observable<any[]> {
        let params: any = {};
        if (idCategorie) params.idCategorie = idCategorie;
        if (minPrice) params.minPrice = minPrice;
        if (avgPrice) params.avgPrice = avgPrice;
        if (maxPrice) params.maxPrice = maxPrice;

        return this.http.get<any[]>(this.baseUrl, {params});
    }

    addProduct(newProduct: any): Observable<any> {
        return this.http.post<any>(this.baseUrl, newProduct);
    }

    getProductById(id: string): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<any>(url);
    }

    updateProduct(id: string, updatedProduct: any): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<any>(url, updatedProduct);
    }

    deleteProduct(id: string): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<any>(url);
    }

    getTopSellingProduct(startDate: string, endDate: string): Observable<any> {
        const url = `${this.baseUrl}/top-selling-in-period`;
        const params = {startDate, endDate};
        return this.http.get<any>(url, {params});
    }
}
