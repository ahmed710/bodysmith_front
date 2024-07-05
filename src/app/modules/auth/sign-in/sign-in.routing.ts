import { Route } from '@angular/router';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { SignedInRedirectComponent } from './signed-in-redirect.component';

export const authSignInRoutes: Route[] = [
    {
        path: '',
        component: AuthSignInComponent,
    },
    { path: 'signed-in-redirect', component: SignedInRedirectComponent },
];
