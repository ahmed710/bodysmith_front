import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CategorieRestaurantService } from '../services/categorie-restaurant.service';

@Injectable({
    providedIn: 'root',
})
export class AdminCategorieRestaurantResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _adminCategorieRestaurantService: CategorieRestaurantService
    ) {}

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
        return this._adminCategorieRestaurantService.getAllCategorieRestaurants();
    }
}
