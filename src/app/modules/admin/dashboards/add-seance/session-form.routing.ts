import { Route } from '@angular/router';
import { AnalyticsComponent } from 'app/modules/admin/dashboards/analytics/analytics.component';
import { AnalyticsResolver } from 'app/modules/admin/dashboards/analytics/analytics.resolvers';
import {AddSeanceFormComponent} from "./session-form.component";

export const sessionFormRoutes: Route[] = [
    {
        path     : '',
        component: AddSeanceFormComponent,
    }
];
