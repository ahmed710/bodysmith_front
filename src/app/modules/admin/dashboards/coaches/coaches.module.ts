import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachComponent } from './coaches.component';
import { CoachService } from './coaches.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { profileRoutes } from './coaches.routing';

@NgModule({
    declarations: [CoachComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        RouterModule.forChild(profileRoutes),
    ],
    providers: [CoachService],
})
export class CoachModule {}
