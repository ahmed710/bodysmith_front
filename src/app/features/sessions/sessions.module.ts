import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsComponent } from './sessions.component';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../shared/material.module'; 
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule if needed
import { AddSeanceFormModule } from './add-seance-form.module'; // Adjust the path as needed

@NgModule({
  declarations: [
    SessionsComponent
  ],
  imports: [
    CommonModule,
    SessionsRoutingModule,
    MatTableModule,
    MaterialModule,
    AddSeanceFormModule,
    ReactiveFormsModule // Import ReactiveFormsModule here if not already imported in AddSeanceFormModule
  ]
})
export class SessionsModule { }
