import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoachService } from './coaches.service';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-coach',
    templateUrl: './coaches.component.html',
    styleUrls: ['./coaches.component.scss'],
})
export class CoachComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('coachTable', { read: MatSort }) coachTableMatSort: MatSort;

    data: any = { coaches: [], results: 0 }; // Initialize data
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
        private _coachService: CoachService,
        private _dialog: MatDialog,
        private _cdr: ChangeDetectorRef // Inject ChangeDetectorRef
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
            .getCoaches()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.data = data;
                this.coachDataSource.data = data.coaches;
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
                            // Reload the coaches data after removing a coach
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
