import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PlatService } from '../services/plat.service';

@Injectable({
    providedIn: 'root',
})
export class AdminPlatResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _adminPlatService: PlatService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this._adminPlatService.getAllPlats();
    }
}
