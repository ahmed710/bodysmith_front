import { Route } from '@angular/router';
import { ProjectComponent } from 'app/modules/admin/dashboards/project/project.component';
import { ProjectResolver } from 'app/modules/admin/dashboards/project/project.resolvers';
import {SessionsComponent} from "./sessions.component";

export const sessionRoutes: Route[] = [
    {
        path     : '',
        component: SessionsComponent,
    }
];
