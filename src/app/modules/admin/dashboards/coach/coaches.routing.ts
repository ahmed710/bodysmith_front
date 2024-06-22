import { Routes } from '@angular/router';
import { CoachesComponent } from './coaches.component'; // Ensure this file exists
import { CoachesResolver } from './coaches.resolvers'; // Ensure this file exists


export const coachesRoutes: Routes = [
    {
      path: '',
      component: CoachesComponent,
      resolve: {
        data: CoachesResolver
      }
    }
  ];