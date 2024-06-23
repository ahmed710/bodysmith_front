import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachesRoutingModule } from './coaches-routing.module';
import { CoachesComponent } from './coaches.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    CoachesComponent
  ],
  imports: [
    CommonModule,
    CoachesRoutingModule,
    MatTableModule
  ]
})
export class CoachesModule { }
