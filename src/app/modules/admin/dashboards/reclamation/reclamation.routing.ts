import { Route } from '@angular/router';
import { ProjectResolver } from 'app/modules/admin/dashboards/project/project.resolvers';
import {ReclamationComponent} from "./reclamation.component";
import {ReclamationResolver} from "./reclamation.resolvers";

export const ReclamationRoutes: Route[] = [
    {
        path     : '',
        component: ReclamationComponent,
        resolve  : {
            data: ReclamationResolver
        }
    }
];
