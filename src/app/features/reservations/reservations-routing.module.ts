import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsComponent } from './reservation.component';
import { ReservationFormComponent } from './reservation-form.component';

const routes: Routes = [
  { path: '', component: ReservationsComponent },
  {path : 'reserver', component :ReservationFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
