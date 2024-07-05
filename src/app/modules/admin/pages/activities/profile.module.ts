import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from './profile.component'; // Adjust the path based on your actual directory structure
import { UserService } from '../profile/user.service'; // Adjust the path based on your actual directory structure

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        RouterModule, // Adjust RouterModule configuration as per your routing needs
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatTooltipModule,
        FuseCardModule,
        SharedModule,
    ],
    providers: [
        UserService, // Add UserService to providers array
    ],
})
export class ProfileModule {}
