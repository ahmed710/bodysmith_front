import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    userId: string; // This will be obtained from route params or another source
    role: string; // Assuming role will be obtained from some source

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        console.log('ProfileComponent initialized');

        // Get userId and role from route params or another source
        this.userId = '665b3024656fe6100270a845'; // Example userId, replace with actual logic to get userId
        this.role = 'ADMIN'; // Example role, replace with actual logic to get role
        // this.route.snapshot.params['id'];
        // Fetch user profile based on userId and role
        this.userService.getUserProfile(this.userId, this.role).subscribe(
            (profile) => {
                console.log('Profile fetched:', profile);
                this.userProfile = profile;
                this.cdr.markForCheck(); // Manually trigger change detection
            },
            (error) => {
                console.error('Error fetching user profile:', error);
                // Handle error as per your application requirements
            }
        );
    }
}
