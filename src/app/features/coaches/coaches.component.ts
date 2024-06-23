import { Component, OnInit } from '@angular/core';
import { CoachesService } from './coaches.service';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {
  coaches: any[] = [];

  constructor(private coachesService: CoachesService) { }

  ngOnInit(): void {
    this.coachesService.getCoaches().subscribe(data => {
      this.coaches = data;
    });
  }

  addCoach(newCoach: any): void {
    this.coachesService.createCoach(newCoach).subscribe(data => {
      this.coaches.push(data);
    });
  }

  updateCoach(id: string, updatedCoach: any): void {
    this.coachesService.updateCoach(id, updatedCoach).subscribe(data => {
      const index = this.coaches.findIndex(c => c.id === id);
      if (index !== -1) {
        this.coaches[index] = data;
      }
    });
  }

  deleteCoach(id: string): void {
    this.coachesService.deleteCoach(id).subscribe(() => {
      this.coaches = this.coaches.filter(c => c.id !== id);
    });
  }
}
