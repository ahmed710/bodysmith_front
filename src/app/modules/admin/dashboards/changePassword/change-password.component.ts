import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from './change-password.service';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
    passwordForm: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';
    hideCurrentPassword: boolean = true;
    hideNewPassword: boolean = true;
    hideConfirmPassword: boolean = true;

    constructor(
        private fb: FormBuilder,
        private changePasswordService: ChangePasswordService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.passwordForm = this.fb.group(
            {
                currentpassword: ['', Validators.required],
                password: ['', [Validators.required, Validators.minLength(6)]],
                passwordconfirm: ['', Validators.required],
            },
            { validator: this.checkPasswords }
        );
    }

    checkPasswords(group: FormGroup) {
        const pass = group.get('password').value;
        const confirmPass = group.get('passwordconfirm').value;
        return pass === confirmPass ? null : { notSame: true };
    }

    onSubmit(): void {
        if (this.passwordForm.valid) {
            const userId = this.authService.currentUser._id;
            this.changePasswordService
                .changePassword(userId, this.passwordForm.value)
                .subscribe(
                    (response) => {
                        this.successMessage = 'Password changed successfully';
                        this.errorMessage = '';
                        this.passwordForm.reset();
                    },
                    (error) => {
                        this.errorMessage =
                            error.error.message || 'An error occurred';
                        this.successMessage = '';
                    }
                );
        }
    }
}
