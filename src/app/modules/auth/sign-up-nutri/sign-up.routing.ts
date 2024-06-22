import { Route } from '@angular/router';
import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';
import { AuthSignUpNutriComponent } from './sign-up.component';

export const authSignupRoutes: Route[] = [
    {
        path: '',
        component: AuthSignUpNutriComponent,
    },
];
