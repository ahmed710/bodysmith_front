import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SharedModule } from 'app/shared/shared.module';
import { AdminRestaurantComponent } from './admin-restaurant.component';
import { AdminRestaurantRoutes } from './admin-restaurant.routing';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';

@NgModule({
    declarations: [AdminRestaurantComponent],
    imports: [
        RouterModule.forChild(AdminRestaurantRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgxMatFileInputModule,
        GeoapifyGeocoderAutocompleteModule.withConfig(
            'b574986973a042cb8d577b4d83053202'
        ),
    ],
})
export class AdminRestaurantModule {}
