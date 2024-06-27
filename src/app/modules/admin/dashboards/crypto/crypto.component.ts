import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './adminSignup.service';

@Component({
    selector       : 'create-admin',
    templateUrl    : './crypto.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAdminComponent implements OnInit
{
    adminForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _adminService: AdminService
    ) {}

    ngOnInit(): void
    {
        this.adminForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            nickName: ['', Validators.required],
            adresse: ['', Validators.required],
            birthDate: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            passwordconfirm: ['', Validators.required],
            phoneNumber: ['', Validators.required]
        }, { validator: this.checkPasswords });
    }

    checkPasswords(group: FormGroup) {
        const pass = group.get('password').value;
        const confirmPass = group.get('passwordconfirm').value;
        return pass === confirmPass ? null : { notSame: true };
    }

    createAdmin(): void
    {
        if (this.adminForm.valid) {
            this._adminService.createAdmin(this.adminForm.value)
                .subscribe(
                    response => {
                        console.log('Admin created successfully', response);
                        // Handle success (e.g., show a success message, redirect)
                    },
                    error => {
                        console.error('Error creating admin', error);
                        // Handle error (e.g., show an error message)
                    }
                );
        }
    }
}