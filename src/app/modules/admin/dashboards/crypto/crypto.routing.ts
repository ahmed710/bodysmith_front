import { Route } from '@angular/router';
import { CreateAdminComponent } from 'app/modules/admin/dashboards/crypto/crypto.component';
import { CryptoResolver } from 'app/modules/admin/dashboards/crypto/crypto.resolvers';

export const cryptoRoutes: Route[] = [
    {
        path     : '',
        component: CreateAdminComponent,
        resolve  : {
            data: CryptoResolver
        }
    }
];
