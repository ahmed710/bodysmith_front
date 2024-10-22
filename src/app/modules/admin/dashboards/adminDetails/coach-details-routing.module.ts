import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CoachDetailsComponent } from './coach-details.component';
import { CoachDetailsRoutes } from './coach-details.routing';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [CoachDetailsComponent],
    imports: [
        RouterModule.forChild(CoachDetailsRoutes),
        SharedModule,
        MatButtonModule,
        MatCardModule,
    ],
})
export class CoachDetailsModule {}
