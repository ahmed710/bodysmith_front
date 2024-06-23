import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'coaches', loadChildren: () => import('./features/coaches/coaches.module').then(m => m.CoachesModule) },
  { path: 'reservations', loadChildren: () => import('./features/reservations/reservations.module').then(m => m.ReservationsModule) },
  { path: 'sessions', loadChildren: () => import('./features/sessions/sessions.module').then(m => m.SessionsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
