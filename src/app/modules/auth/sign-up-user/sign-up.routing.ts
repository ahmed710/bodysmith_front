import { Route } from '@angular/router';
import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';
import { AuthSignUpUserComponent } from './sign-up.component';

export const authSignupRoutes: Route[] = [
    {
        path: '',
        component: AuthSignUpUserComponent,
    },
];
