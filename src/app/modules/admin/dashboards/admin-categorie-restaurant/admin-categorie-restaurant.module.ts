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
import { AdminCategorieRestaurantComponent } from './admin-categorie-restaurant.component';
import { AdminCategorieRestaurantRoutes } from './admin-categorie-restaurant.routing';

@NgModule({
    declarations: [AdminCategorieRestaurantComponent],
    imports: [
        RouterModule.forChild(AdminCategorieRestaurantRoutes),
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgxMatFileInputModule,
    ],
})
export class AdminCategorieRestaurantModule {}
