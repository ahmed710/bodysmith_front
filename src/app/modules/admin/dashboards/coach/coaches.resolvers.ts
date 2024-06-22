import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CoachesService } from './coaches.service';

@Injectable({
    providedIn: 'root'
})
export class CoachesResolver implements Resolve<any>
{
    constructor(private _coachesService: CoachesService)
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._coachesService.getData();
    }
}
