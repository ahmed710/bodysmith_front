import { Route } from '@angular/router';
import { AnalyticsComponent } from 'app/modules/admin/dashboards/analytics/analytics.component';
import { AnalyticsResolver } from 'app/modules/admin/dashboards/analytics/analytics.resolvers';
import {CoachesComponent} from "./coaches.component";

export const coachesRoutes: Route[] = [
    {
        path     : '',
        component: CoachesComponent,
    }
];
