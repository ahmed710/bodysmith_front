import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionsService } from '../sessions/sessions.service';

@Component({
  selector: 'app-add-seance-form',
  templateUrl: './session-form.component.html',
})
export class AddSeanceFormComponent implements OnInit {
  seanceForm!: FormGroup;

  typeEvents = [
    "PRIVATE_COURSE",
    "DANCE_COURSE",
    "BODYCOMBAT_COURSE",
    "SPINNING_COURSE",
    "ORIONTAL_DANCE_COURSE"
  ];

  constructor(private fb: FormBuilder, private seanceService: SessionsService) {}

  ngOnInit(): void {
    this.seanceForm = this.fb.group({
      TypeEvent: ['', Validators.required],
      IdSalleDeSport: [null, Validators.required],
      DateEvent: ['', Validators.required],
      NbrParticipant: [null, Validators.required],
      Capacity: [null, Validators.required],
      HeureDebutEvent: ['', Validators.required],
      Durée: [null, Validators.required],
      HeureFinEvent: [''],
      coachId: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.seanceForm.valid) {
      console.log('Form Data:', this.seanceForm.value);
      const formData = { ...this.seanceForm.value };

      formData.DateEvent = new Date(formData.DateEvent).toISOString();
      formData.HeureDebutEvent = new Date(formData.HeureDebutEvent).toISOString();

      if (typeof formData.TypeEvent === 'string') {
        formData.TypeEvent = [formData.TypeEvent];
      }

      if (formData.Durée && formData.HeureDebutEvent && !formData.HeureFinEvent) {
        const heureDebut = new Date(formData.HeureDebutEvent);
        heureDebut.setHours(heureDebut.getHours() + formData.Durée);
        formData.HeureFinEvent = heureDebut.toISOString();
      }

      this.seanceService.createSessions(formData).subscribe(
        (response: any) => {
          console.log('Séance ajoutée avec succès :', response);
          this.seanceForm.reset();
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout de la séance :', error);
          if (error.status === 400) {
            console.error('Détails de l\'erreur :', error.error);
          }
        }
      );
    } else {
      console.log('Formulaire non valide');
      this.validateAllFormFields(this.seanceForm);
    }
  }

  // Helper method to validate all fields
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
}
