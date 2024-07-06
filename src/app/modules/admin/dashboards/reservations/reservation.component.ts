import { Component, OnInit } from '@angular/core';
import { ReservationsService } from './reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationsService: ReservationsService) { }

  ngOnInit(): void {
    this.reservationsService.getReservations().subscribe(data => {
      this.reservations = data;
    });
  }

  addReservation(newReservation: any): void {
    this.reservationsService.createReservation(newReservation).subscribe(data => {
      this.reservations.push(data);
    });
  }

  updateReservation(id: string, updatedReservation: any): void {
    this.reservationsService.updateReservation(id, updatedReservation).subscribe(data => {
      const index = this.reservations.findIndex(c => c.id === id);
      if (index !== -1) {
        this.reservations[index] = data;
      }
    });
  }

  editReservation(coach: any): void {
    console.log('Editing coach', coach);
    // Implement your edit logic here 
  }


  deleteReservation(id: string): void {
    this.reservationsService.deleteReservation(id).subscribe(() => {
      this.reservations = this.reservations.filter(c => c.id !== id);
    });
  }
}
