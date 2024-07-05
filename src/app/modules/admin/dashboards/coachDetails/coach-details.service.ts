import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CoachDetailsService {
    private coachData: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private http: HttpClient) {}

    getCoachById(coachId: string): Observable<any> {
        return this.http
            .get<any>(`http://127.0.0.1:9090/admin/${coachId}`)
            .pipe(
                tap((coach) => {
                    this.coachData.next(coach);
                })
            );
    }

    get coachData$(): Observable<any> {
        return this.coachData.asObservable();
    }
}
