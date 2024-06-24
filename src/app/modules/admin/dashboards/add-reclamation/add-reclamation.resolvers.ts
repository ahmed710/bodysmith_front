import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AddReclamationService} from "./add-reclamation.service";

@Injectable({
    providedIn: 'root'
})
export class AddReclamationResolver{
    /**
     * Constructor
     */
    constructor(private _addReclamationService: AddReclamationService) {
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
}
