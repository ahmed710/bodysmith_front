import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'auth-confirmation-required',
    templateUrl: './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthConfirmationRequiredComponent {
    confirmationForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _httpClient: HttpClient,
        private _router: Router
    ) {
        // Create the form
        this.confirmationForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            approvalCode: ['', Validators.required],
        });
    }

    onSubmit(): void {
        if (this.confirmationForm.invalid) {
            return;
        }

        const formData = this.confirmationForm.value;

        this._httpClient
            .post('http://127.0.0.1:9090/approve/', {
                email: formData.email,
                approvalCode: formData.approvalCode,
            })
            .subscribe(
                (response) => {
                    console.log('Approval successful:', response);
                    // Redirect to the dashboard project page
                    this._router.navigate(['/dashboards/project']);
                },
                (error) => {
                    console.error('Error approving:', error);
                }
            );
    }
}
