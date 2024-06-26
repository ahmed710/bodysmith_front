// coach-details.routing.ts

import { Route } from '@angular/router';
import { CoachDetailsComponent } from './coach-details.component';

export const CoachDetailsRoutes: Route[] = [
    {
        path: ':id',
        component: CoachDetailsComponent,
    },
];
