import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutriComponent } from './nutri.component';
import { NutriService } from './nutri.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { profileRoutes } from './nutri.routing';

@NgModule({
    declarations: [NutriComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        RouterModule.forChild(profileRoutes),
    ],
    providers: [NutriService],
})
export class NutriModule {}
