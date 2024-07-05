import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'app-signed-in-redirect',
    template: '<p>Redirecting...</p>',
})
export class SignedInRedirectComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const tokens = params['tokens'];
            if (tokens) {
                const parsedTokens = JSON.parse(decodeURIComponent(tokens));
                this.authService.storeTokens(parsedTokens); // Store tokens in local storage or state
                this.authService.signInUsingToken().subscribe(
                    () => {
                        this.router.navigate(['/dashboard']); // Redirect to dashboard after successful sign-in
                    },
                    () => {
                        this.router.navigate(['/login']); // Redirect to login if sign in with token fails
                    }
                );
            } else {
                this.router.navigate(['/login']); // Redirect to login if no tokens
            }
        });
    }
}
