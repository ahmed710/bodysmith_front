import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachesRoutingModule } from './coaches-routing.module';
import { CoachesComponent } from './coaches.component';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../shared/material.module'; 
import { ReactiveFormsModule } from '@angular/forms'; // Ajout de ReactiveFormsModule

@NgModule({
  
  declarations: [
    CoachesComponent
  ],
  imports: [
    CommonModule,
    CoachesRoutingModule,
    MatTableModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CoachesModule { }
