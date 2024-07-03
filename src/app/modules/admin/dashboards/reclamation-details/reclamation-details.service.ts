import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReclamationDetailsService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getReclamationById(id:number) {
        return this._httpClient.get('http://127.0.0.1:9090/reclamation/'+id).pipe(
            tap((response: any) => {
                this._data.next(response);
                console.log(response);
            })
        );
    }
    updateReclamation(id: number, updatedData: any): Observable<any> {
        return this._httpClient.patch('http://127.0.0.1:9090/reclamation/'+id, updatedData);
    }
    getCommentaires(idUser: string,idReclamation : number){
        return this._httpClient.get('http://127.0.0.1:9090/commentaire/'+idUser+'/'+idReclamation);
    }

}
