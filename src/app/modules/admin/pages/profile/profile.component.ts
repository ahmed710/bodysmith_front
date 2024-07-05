import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { AuthService } from '../core/auth/auth.service'; // Adjust the path as per your project structure
import { AuthService } from '../../../../core/auth/auth.service'; // Adjust the path as per your project structure
import { UserService } from './user.service'; // Adjust the path as per your project structure

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    userProfile: any; // Assuming userProfile will hold the fetched user data
    userId: string;
    role: string;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private userService: UserService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        console.log('ProfileComponent initialized');

        // Fetch userId and role from AuthService
        this.userId = this.authService.currentUser._id; 
        this.role = this.authService.currentUser.role; 

        // Fetch user profile based on userId and role
        this.userService.getUserProfile(this.userId, this.role).subscribe(
            (profile) => {
                console.log('Profile fetched:', profile);
                this.userProfile = profile;
                this.cdr.markForCheck();
            },
            (error) => {
                console.error('Error fetching user profile:', error);
            }
        );
    }
}
