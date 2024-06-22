import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {ReclamationService} from "./reclamation.service";

@Injectable({
    providedIn: 'root'
})
export class ReclamationResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _reclamationService: ReclamationService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._reclamationService.getData();
    }
}
