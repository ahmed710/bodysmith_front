import { Route } from '@angular/router';
import { UsersComponent } from 'app/modules/admin/pages/users/profile.component';

export const profileRoutes: Route[] = [
    {
        path: '',
        component: UsersComponent,
    },
];
