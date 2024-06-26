import { Route } from '@angular/router';
import { UsersComponent } from './users.component';

export const profileRoutes: Route[] = [
    {
        path: '',
        component: UsersComponent,
    },
];
