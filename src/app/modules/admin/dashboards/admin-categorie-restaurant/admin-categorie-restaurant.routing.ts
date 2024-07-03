import { Route } from '@angular/router';
import { ProjectResolver } from 'app/modules/admin/dashboards/project/project.resolvers';
import { AdminCategorieRestaurantComponent } from './admin-categorie-restaurant.component';
import { AdminCategorieRestaurantResolver } from './admin-categorie-restaurant.resolvers';

export const AdminCategorieRestaurantRoutes: Route[] = [
    {
        path: '',
        component: AdminCategorieRestaurantComponent,
        resolve: {
            data: AdminCategorieRestaurantResolver,
        },
    },
];
