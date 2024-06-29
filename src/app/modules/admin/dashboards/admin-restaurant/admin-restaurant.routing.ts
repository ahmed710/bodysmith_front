import { Route } from '@angular/router';
import { ProjectResolver } from 'app/modules/admin/dashboards/project/project.resolvers';
import { AdminRestaurantComponent } from './admin-restaurant.component';
import { AdminRestaurantResolver } from './admin-restaurant.resolvers';

export const AdminRestaurantRoutes: Route[] = [
    {
        path: '',
        component: AdminRestaurantComponent,
        resolve: {
            data: AdminRestaurantResolver,
        },
    },
];
