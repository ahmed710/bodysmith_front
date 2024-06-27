import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NutriService } from './users.service'; // Adjust import to actual service
import { ConfirmDialogComponent } from '../coaches/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatSort) coachTableMatSort: MatSort;

    data: any; // Initialize data
    coachDataSource: MatTableDataSource<any> = new MatTableDataSource();
    coachTableColumns: string[] = [
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'birthDate',
        'role',
        'active',
        'isApproved',
        'actions',
    ];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _coachService: NutriService,
        private _dialog: MatDialog,
        private _cdr: ChangeDetectorRef // Inject ChangeDetectorRef for manual triggering
    ) {}

    ngOnInit(): void {
        this.loadCoaches();
    }

    ngAfterViewInit(): void {
        this.coachDataSource.sort = this.coachTableMatSort;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    loadCoaches(): void {
        this._coachService
            .getNutris()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.data = data;
                this.coachDataSource.data = data.data; // Update to your actual data structure
                this._cdr.markForCheck(); // Mark for check after updating data
            });
    }

    removeCoach(coachId: string): void {
        const dialogRef = this._dialog.open(ConfirmDialogComponent, {
            data: { message: 'Are you sure you want to remove this coach?' },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._coachService
                    .removeCoach(coachId)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(
                        () => {
                            // Update the view after removing a coach
                            this.loadCoaches();
                        },
                        (error) => {
                            console.error('Error removing coach:', error);
                            // Optionally, show an error message to the user
                        }
                    );
            }
        });
    }

    trackByFn(index: number, item: any): any {
        return item._id || index;
    }
    toggleAccountStatus(coach: any): void {
        const action = coach.active ? 'deactivate' : 'reactivate';
        const dialogRef = this._dialog.open(ConfirmDialogComponent, {
            data: {
                message: `Are you sure you want to ${action} this coach's account?`,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const method = coach.active
                    ? this._coachService.deactivateCoach(coach._id)
                    : this._coachService.reactivateCoach(coach._id);

                method.pipe(takeUntil(this._unsubscribeAll)).subscribe(
                    (response) => {
                        console.log(response.response);
                        this.loadCoaches(); // Reload the coaches data
                    },
                    (error) => {
                        console.error(`Error ${action}ing coach:`, error);
                        // Optionally, show an error message to the user
                    }
                );
            }
        });
    }
}
