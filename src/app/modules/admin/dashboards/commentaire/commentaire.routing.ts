import { Route } from '@angular/router';
import { ProjectResolver } from 'app/modules/admin/dashboards/project/project.resolvers';
import {CommentaireResolvers } from "./commentaire.resolvers";
import {CommentaireComponent} from "./commentaire.component";

export const ReclamationRoutes: Route[] = [
    {
        path     : '',
        component: CommentaireComponent,
        resolve  : {
            data: CommentaireResolvers
        }
    }
];
