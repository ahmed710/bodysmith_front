import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { NutriService } from './users.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { profileRoutes } from './users.routing';

@NgModule({
    declarations: [UsersComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        RouterModule.forChild(profileRoutes),
    ],
    providers: [NutriService],
})
export class UsersModule {}
