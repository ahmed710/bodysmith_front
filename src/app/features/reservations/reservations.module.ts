// src/app/features/reservations/reservations.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from './reservations.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ReservationsService
  ]
})
export class ReservationsModule { }
