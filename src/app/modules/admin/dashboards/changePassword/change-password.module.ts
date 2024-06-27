import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordService } from './change-password.service';
import { RouterModule } from '@angular/router';
import { analyticsRoutes } from './analytics.routing';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [ChangePasswordComponent],
    imports: [
        RouterModule.forChild(analyticsRoutes),
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule
    ],
    providers: [ChangePasswordService],
    exports: [ChangePasswordComponent],
})
export class ChangePasswordModule {}
