import { Route } from '@angular/router';
import { ProjectResolver } from 'app/modules/admin/dashboards/project/project.resolvers';
import {ReclamationDetailsComponent} from "./reclamation-details.component";

export const ReclamationDetailsRoutes: Route[] = [
    {
        path     : '',
        component: ReclamationDetailsComponent,
    }
];
