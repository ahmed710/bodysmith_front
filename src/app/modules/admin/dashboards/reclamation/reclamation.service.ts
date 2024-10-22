import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReclamationService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any> {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any> {
        return this._httpClient.get('http://127.0.0.1:9090/reclamation/').pipe(
            tap((response: any) => {
                this._data.next(response);
                console.log(response);
            })
        );
    }

    deleteById(id: number): Observable<any> {
        return this._httpClient.delete('http://127.0.0.1:9090/reclamation/' + id);
    }

    searchReclamation(key: string): Observable<any> {
        return this._httpClient.get(`http://127.0.0.1:9090/reclamation/search/${key}`);
    }
    traiterReclamation(id: number): Observable<any> {
        return this._httpClient.patch(`http://127.0.0.1:9090/reclamation/${id}/traiter`, {});
    }

    ouvrireReclamation(id: number): Observable<any> {
        return this._httpClient.patch(`http://127.0.0.1:9090/reclamation/${id}/ouvrire`, {});
    }

    fermerReclamation(id: number): Observable<any> {
        return this._httpClient.patch(`http://127.0.0.1:9090/reclamation/${id}/fermer`, {});
    }
}
