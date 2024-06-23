import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddSeanceFormComponent } from './session-form.component'; // Adjust the path as per your actual folder structure

@NgModule({
  declarations: [
    AddSeanceFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AddSeanceFormComponent
  ]
})
export class AddSeanceFormModule { }
