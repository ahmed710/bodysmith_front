import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SharedModule } from 'app/shared/shared.module';
import { AdminRestaurantComponent } from './admin-restaurant.component';
import { AdminRestaurantRoutes } from './admin-restaurant.routing';

@NgModule({
    declarations: [AdminRestaurantComponent],
    imports: [
        RouterModule.forChild(AdminRestaurantRoutes),
        SharedModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        GeoapifyGeocoderAutocompleteModule.withConfig(
            'b574986973a042cb8d577b4d83053202'
        ),
        NgxMatFileInputModule,
    ],
})
export class AdminRestaurantModule {}
