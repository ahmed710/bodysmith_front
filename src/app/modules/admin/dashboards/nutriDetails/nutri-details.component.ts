import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoachDetailsService } from './nutri-details.service';

@Component({
    selector: 'app-coach-details',
    templateUrl: './nutri-details.component.html',
    styleUrls: ['./nutri-details.component.scss'],
})
export class CoachDetailsComponent {
    coach: any;
    clicked = false;

    constructor(
        private ar: ActivatedRoute,
        private coachDetailsService: CoachDetailsService
    ) {
        const coachId = this.ar.snapshot.params['id'];
        this.coachDetailsService.getCoachById(coachId).subscribe({
            next: (data) => {
                this.coach = data;
            },
            error: (error) => {
                console.error('Error fetching coach details:', error);
                // Handle error (e.g., show error message)
            },
        });
    }

    getData() {
        this.clicked = true;
    }
}
