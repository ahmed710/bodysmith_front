import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionsService } from '../sessions/sessions.service'; // Adjust the path as per your actual folder structure

@Component({
  selector: 'app-add-seance-form',
  templateUrl: './session-form.component.html', // Correct the template file path
})
export class AddSeanceFormComponent implements OnInit {
  seanceForm!: FormGroup;

  constructor(private fb: FormBuilder, private seanceService: SessionsService) {}

  ngOnInit(): void {
    this.seanceForm = this.fb.group({
      typeEvent: ['', Validators.required],
      idSalleDeSport: ['', Validators.required],
      dateEvent: ['', Validators.required],
      nbrParticipant: [0, [Validators.required, Validators.min(0)]],
      capacity: [10, [Validators.required, Validators.min(1)]],
      heureDebutEvent: ['', Validators.required],
      duree: [2, [Validators.required, Validators.min(1)]],
      coach: ['', Validators.required],
    });
   
  }

  onSubmit(): void {
    if (this.seanceForm.valid) {
      const formData = this.seanceForm.value;
      this.seanceService.createSessions(formData).subscribe(
        (response: any) => { // Specify the response type
          console.log('Séance ajoutée avec succès :', response);
          // Reset the form after submission
          this.seanceForm.reset();
        },
        (error: any) => { // Specify the error type
          console.error('Erreur lors de l\'ajout de la séance :', error);
          // Handle errors here
        }
      );
    }
  }
}
