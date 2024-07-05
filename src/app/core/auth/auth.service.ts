import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
    BehaviorSubject,
    catchError,
    Observable,
    of,
    switchMap,
    throwError,
} from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { Route, Router } from '@angular/router';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    private _accessToken: string | null = null;
    private _refreshToken: string | null = null; // Define _refreshToken
    isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    private _currentUser: any;
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _router: Router
    ) {
        this._accessToken = this.getAccessToken();
        if (this._accessToken) {
            this._authenticated = true;
            this.isAuthenticated.next(true);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string | null) {
        this._accessToken = token;
        if (token) {
            localStorage.setItem('accessToken', token);
        } else {
            localStorage.removeItem('accessToken');
        }
    }

    get accessToken(): string | null {
        return this._accessToken;
    }
    private getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }
    get currentUser(): any {
        return this._currentUser;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post(
            'http://127.0.0.1:9090/auth/forgot-password/',
            { email }
        );
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(token: string, password: string): Observable<any> {
        return this._httpClient.post(
            'http://127.0.0.1:9090/auth/reset-password/',
            { token, password }
        );
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post('http://127.0.0.1:9090/auth/login/', credentials)
            .pipe(
                switchMap((response: any) => {
                    console.log('Response from signIn:', response); // Check response structure
                    console.log('ROOOOOOOLE', response.user.role);
                    console.log('state', response.user.active);
                    // Store the access token in the local storage
                    if (
                        (response.user.role === 'ADMIN' ||
                            response.user.role === 'COACH') &&
                        response.user.active
                    ) {
                        if (response.user.isApproved === false) {
                            // Redirect to confirmation-required page
                            this._router.navigate(['/confirmation-required']);
                            return throwError('Account not approved');
                        } else {
                            // Store the access token in the local storage
                            this.accessToken = response.tokens.access.token;
                            this._authenticated = true;
                            this._currentUser = response.user;

                            // Store the user on the user service
                            this._userService.user = response.user;

                            // Return a new observable with the response
                            return of(response);
                        }
                    } else {
                        // If the user doesn't have the correct role or is not active, throw an error
                        return throwError(
                            'Access denied. Invalid role or inactive account.'
                        );
                    }
                }),
                catchError((error) => {
                    this.accessToken = null; // Clear token on error if necessary
                    return throwError(error);
                })
            );
    }

    /**
     * Sign in using the access token
     */
    // signInUsingToken(): Observable<any> {
    //     // Sign in using the token
    //     return this._httpClient
    //         .post('api/auth/sign-in-with-token', {
    //             accessToken: this.accessToken,
    //         })
    //         .pipe(
    //             catchError(() =>
    //                 // Return false
    //                 of(false)
    //             ),
    //             switchMap((response: any) => {
    //                 // Replace the access token with the new one if it's available on
    //                 // the response object.
    //                 //
    //                 // This is an added optional step for better security. Once you sign
    //                 // in using the token, you should generate a new one on the server
    //                 // side and attach it to the response object. Then the following
    //                 // piece of code can replace the token with the refreshed one.
    //                 if (response.accessToken) {
    //                     this.accessToken = response.accessToken;
    //                 }

    //                 // Set the authenticated flag to true
    //                 this._authenticated = true;

    //                 // Store the user on the user service
    //                 this._userService.user = response.user;

    //                 // Return true
    //                 return of(true);
    //             })
    //         );
    // }

    signInUsingToken(): Observable<any> {
        // Example assuming a backend API endpoint '/api/auth/sign-in-with-token'
        return this._httpClient.post('/api/auth/sign-in-with-token', {}).pipe(
            switchMap((response: any) => {
                // Optionally, refresh access token if backend returns new one
                return this.checkAuthentication();
            }),
            catchError((error) => {
                this.signOut(); // Handle error by logging out user
                return throwError(error);
            })
        );
    }
    checkAuthentication(): Observable<boolean> {
        const accessToken = this.getAccessToken();
        if (!accessToken) {
            return throwError('No access token found');
        }
    }
    /**
     * Sign out
     */
    signOut(): Observable<any> {
        this.accessToken = null;
        this._authenticated = false;
        this.isAuthenticated.next(false);
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        firstName: string;
        lastName: string;
        nickName: string;
        birthDate: string;
        adresse: string;
        email: string;
        password: string;
        passwordconfirm: string;
        phoneNumber: number;
    }): Observable<any> {
        console.log('mrgl ?', user);
        return this._httpClient
            .post('http://127.0.0.1:9090/user/signup', user)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.error && error.error.errors) {
                        // Handle structured errors from backend
                        const errorMessage = error.error.errors
                            .map((e) => e.msg)
                            .join(', ');
                        return throwError(errorMessage);
                    } else {
                        // Handle other errors (e.g., server errors)
                        let errorMessage =
                            'An error occurred. Please try again later.';
                        if (error.error instanceof ErrorEvent) {
                            errorMessage = `Error: ${error.error.message}`;
                        } else {
                            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        }
                        console.error(errorMessage);
                        return throwError(errorMessage);
                    }
                })
            );
    }
    /**
     * Sign up as User
     *
     * @param user
     */
    signUpUser(user: {
        firstName: string;
        lastName: string;
        nickName: string;
        birthDate: string;
        adresse: string;
        email: string;
        password: string;
        passwordconfirm: string;
        phoneNumber: number;
    }): Observable<any> {
        console.log('mrgl ?', user);
        return this._httpClient
            .post('http://127.0.0.1:9090/user/signup', user)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.error && error.error.errors) {
                        // Handle structured errors from backend
                        const errorMessage = error.error.errors
                            .map((e) => e.msg)
                            .join(', ');
                        return throwError(errorMessage);
                    } else {
                        // Handle other errors (e.g., server errors)
                        let errorMessage =
                            'An error occurred. Please try again later.';
                        if (error.error instanceof ErrorEvent) {
                            errorMessage = `Error: ${error.error.message}`;
                        } else {
                            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        }
                        console.error(errorMessage);
                        return throwError(errorMessage);
                    }
                })
            );
    }

    /**
     * Sign up as Coach
     *
     * @param user
     */
    signUpCoach(user: {
        firstName: string;
        lastName: string;
        nickName: string;
        birthDate: string;
        adresse: string;
        email: string;
        password: string;
        passwordconfirm: string;
        phoneNumber: number;
    }): Observable<any> {
        console.log('mrgl ?', user);
        return this._httpClient
            .post('http://127.0.0.1:9090/coach/signup', user)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.error && error.error.errors) {
                        // Handle structured errors from backend
                        const errorMessage = error.error.errors
                            .map((e) => e.msg)
                            .join(', ');
                        return throwError(errorMessage);
                    } else {
                        // Handle other errors (e.g., server errors)
                        let errorMessage =
                            'An error occurred. Please try again later.';
                        if (error.error instanceof ErrorEvent) {
                            errorMessage = `Error: ${error.error.message}`;
                        } else {
                            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        }
                        console.error(errorMessage);
                        return throwError(errorMessage);
                    }
                })
            );
    }

    /**
     * Sign up as nutritionniste
     *
     * @param user
     */
    signUpNutri(user: {
        firstName: string;
        lastName: string;
        nickName: string;
        birthDate: string;
        adresse: string;
        email: string;
        password: string;
        passwordconfirm: string;
        phoneNumber: number;
    }): Observable<any> {
        console.log('mrgl ?', user);
        return this._httpClient
            .post('http://127.0.0.1:9090/nutritionniste/signup', user)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.error && error.error.errors) {
                        // Handle structured errors from backend
                        const errorMessage = error.error.errors
                            .map((e) => e.msg)
                            .join(', ');
                        return throwError(errorMessage);
                    } else {
                        // Handle other errors (e.g., server errors)
                        let errorMessage =
                            'An error occurred. Please try again later.';
                        if (error.error instanceof ErrorEvent) {
                            errorMessage = `Error: ${error.error.message}`;
                        } else {
                            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        }
                        console.error(errorMessage);
                        return throwError(errorMessage);
                    }
                })
            );
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
    public storeTokens(tokens: {
        access: { token: string; expires: number };
        refresh: { token: string; expires: number };
    }): void {
        // Store access token
        this.accessToken = tokens.access.token;

        // Store refresh token
        this._refreshToken = tokens.refresh.token;
        localStorage.setItem('refreshToken', tokens.refresh.token);

        // Update authenticated state
        this.isAuthenticated.next(true);
        this._authenticated = true;
    }

    // getAccessToken(): string {
    //     // Retrieve access token from local storage or state
    //     return localStorage.getItem('accessToken') || this.accessToken;
    // }

    // isAuthenticated(): boolean {
    //     // Check if user is authenticated based on token presence
    //     return !!this.getAccessToken();
    // }
}
