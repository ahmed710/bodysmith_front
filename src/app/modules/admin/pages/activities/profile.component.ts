import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../profile/user.service'; // Adjust the path based on your actual directory structure

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
    userProfile: any; // Assuming userProfile will hold the fetched user data
    userId: string; // This will be obtained from route params or another source

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        // Example: Fetch userId from route params
        this.route.paramMap.subscribe((params) => {
            this.userId = params.get('userId'); // Adjust 'userId' based on your actual route parameter name
            const role = 'ADMIN'; // Replace with actual logic to determine user role

            // Fetch user profile based on userId and role
            this.userService.getUserProfile(this.userId, role).subscribe(
                (profile) => {
                    this.userProfile = profile;
                },
                (error) => {
                    console.error('Error fetching user profile:', error);
                    // Handle error as per your application requirements
                }
            );
        });
    }
}
