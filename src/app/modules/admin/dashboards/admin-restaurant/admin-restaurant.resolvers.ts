import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RestaurantService } from '../services/restaurant.service';

@Injectable({
    providedIn: 'root',
})
export class AdminRestaurantResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _adminRestaurantService: RestaurantService) {}

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
        return this._adminRestaurantService.getAllRestaurants();
    }
}
