import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutriComponent } from './nutri.component';
import { NutriService } from './nutri.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { profileRoutes } from './nutri.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
    declarations: [NutriComponent,ConfirmDialogComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        RouterModule.forChild(profileRoutes),
        MatDialogModule,
        MatButtonModule,
    ],
    providers: [NutriService],
})
export class NutriModule {}
