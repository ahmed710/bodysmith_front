import { Route } from '@angular/router';
import { ProjectResolver } from 'app/modules/admin/dashboards/project/project.resolvers';
import {AddReclamationComponent} from "./add-reclamation.component";
import {AddReclamationResolver} from "./add-reclamation.resolvers";

export const AddReclamationRoutes: Route[] = [
    {
        path     : '',
        component: AddReclamationComponent,
        resolve  : {
            data: AddReclamationResolver
        }
    }
];
