import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachesRoutingModule } from './zouhour-coaches-routing.module';
import { CoachesComponent } from './zouhour-coaches.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms'; // Ajout de ReactiveFormsModule

@NgModule({
  declarations: [
    CoachesComponent
  ],
  imports: [
    CommonModule,
    CoachesRoutingModule,
    MatTableModule,
    ReactiveFormsModule
  ]
})
export class CoachesModule { }
