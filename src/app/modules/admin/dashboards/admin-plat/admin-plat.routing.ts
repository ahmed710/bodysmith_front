import { Route } from '@angular/router';
import { ProjectResolver } from 'app/modules/admin/dashboards/project/project.resolvers';
import { AdminPlatComponent } from './admin-plat.component';
import { AdminPlatResolver } from './admin-plat.resolvers';

export const AdminPlatRoutes: Route[] = [
    {
        path: '',
        component: AdminPlatComponent,
        resolve: {
            data: AdminPlatResolver,
        },
    },
];
