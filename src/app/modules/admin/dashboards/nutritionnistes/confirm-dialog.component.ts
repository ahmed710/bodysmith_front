import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    template: `
        <h2 mat-dialog-title>Confirm Action</h2>
        <mat-dialog-content>{{ data.message }}</mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button [mat-dialog-close]="false">Cancel</button>
            <button mat-button [mat-dialog-close]="true" cdkFocusInitial>
                Confirm
            </button>
        </mat-dialog-actions>
    `,
})
export class ConfirmDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { message: string }
    ) {}
}
