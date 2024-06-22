import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { passwordMatchValidator } from 'app/validators/password-match.validator'; // Import the custom validator

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpCoachComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.signUpForm = this._formBuilder.group(
            {
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                nickName: ['', Validators.required],
                birthDate: ['', Validators.required],
                adresse: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required],
                passwordconfirm: ['', Validators.required],
                phoneNumber: [
                    '',
                    [Validators.required, Validators.pattern(/^\d{8}$/)],
                ],
                agreements: [false, Validators.requiredTrue],
            },
            { validators: passwordMatchValidator }
        );
    }

    signUp(): void {
        if (this.signUpForm.invalid) {
            return;
        }

        this.signUpForm.disable();
        this.showAlert = false;

        this._authService.signUp(this.signUpForm.value).subscribe(
            (response) => {
                this._router.navigateByUrl('/confirmation-required');
            },
            (errorMessage) => {
                // Handle error message returned from service
                this.signUpForm.enable();
                this.signUpNgForm.resetForm();
                this.alert = {
                    type: 'error',
                    message: errorMessage,
                };
                this.showAlert = true;
            }
        );
    }

    private getErrorMessage(error: any): string {
        let message = 'Something went wrong, please try again.';
        if (error && error.message) {
            message = error.message;
        }
        return message;
    }
}
