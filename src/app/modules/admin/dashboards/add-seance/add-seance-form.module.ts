import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSeanceFormComponent } from './session-form.component';

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
export class AddSeanceFormModule {}
