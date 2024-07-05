import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachComponent } from './coaches.component';
import { CoachService } from './coaches.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { profileRoutes } from './coaches.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
    declarations: [CoachComponent,ConfirmDialogComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        RouterModule.forChild(profileRoutes),
        MatDialogModule,
        MatButtonModule,
    ],
    providers: [CoachService],
})
export class CoachModule {}
