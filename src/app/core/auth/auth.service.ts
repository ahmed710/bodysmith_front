import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
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
                    // Store the access token in the local storage
                    this.accessToken = response.accessToken;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return a new observable with the response
                    return of(response);
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
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
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
    storeTokens(tokens: any): void {
        // Store tokens in local storage or state
        this.accessToken = tokens.accessToken;
        localStorage.setItem('accessToken', this.accessToken);
    }

    getAccessToken(): string {
        // Retrieve access token from local storage or state
        return localStorage.getItem('accessToken') || this.accessToken;
    }

    isAuthenticated(): boolean {
        // Check if user is authenticated based on token presence
        return !!this.getAccessToken();
    }
}
