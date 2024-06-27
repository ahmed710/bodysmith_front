import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {coachesRoutes} from './coaches-routing.routing';
import { CoachesComponent } from './coaches.component';
import { MatTableModule } from '@angular/material/table';
import {RouterModule} from "@angular/router";
import {analyticsRoutes} from "../analytics/analytics.routing";

@NgModule({

  declarations: [
    CoachesComponent
  ],
  imports: [
      RouterModule.forChild(coachesRoutes),
    CommonModule,
    MatTableModule,
  ]
})
export class CoachesModule { }
