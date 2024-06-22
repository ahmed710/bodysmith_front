import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoachesService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient)
    {
    }

    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }

    getData(): Observable<any>
    {
        return this._httpClient.get('api/coaches').pipe(
            tap((response: any) => {
                this._data.next(response);
            })
        );
    }
}
