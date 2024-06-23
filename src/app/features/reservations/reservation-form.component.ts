// reservation-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from './reservations.service';
import { SessionsService } from '../sessions/sessions.service';
import { CoachesService } from '../coaches/coaches.service';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
//   styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;
  seances: any[] = [];
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationsService,
    private sessionService: SessionsService, 
    private coachesService: CoachesService 
  ) {
    this.reservationForm = this.fb.group({
      seanceId: ['', Validators.required],
      coachId: ['', Validators.required],
      // Ajoutez d'autres champs nécessaires pour la réservation si nécessaire
    });
  }
  

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      seanceId: ['', Validators.required],
      coachId: ['', Validators.required],
      // Ajoutez d'autres champs nécessaires pour la réservation si nécessaire
    });

    this.loadSeances();
    this.loadUsers();
  }
//   loadSeances() {
//     this.sessionService.getSessions().subscribe(seances => {
//       this.seances = seances;
//     });
//   }
  
//   loadUsers() {
//     this.coachesService.getCoaches().subscribe(users => {
//       this.users = users;
//     });
//   }
loadSeances() {
    this.sessionService.getSessions().subscribe(
      seances => {
        this.seances = seances;
      },
      error => {
        console.error('Erreur lors du chargement des séances :', error);
      }
    );
  }
  
  loadUsers() {
    this.coachesService.getCoaches().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Erreur lors du chargement des coaches :', error);
      }
    );
  }
  onSubmit() {
    if (this.reservationForm.valid) {
      const reservationData = this.reservationForm.value;
      this.reservationService.createReservation(reservationData).subscribe(
        response => {
          console.log('Réservation créée avec succès :', response);
          console.log('reservationData :', reservationData);
          // Action après la création réussie
        },
        error => {
          console.error('Erreur lors de la création de la réservation :', error);
          // Gérer les erreurs ici
        }
      );
    } else {
      this.reservationForm.markAllAsTouched();
    }
  }
}
