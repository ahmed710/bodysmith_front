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
      name: ['', Validators.required],
      description: ['', Validators.required]
      // Add other fields as needed
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
