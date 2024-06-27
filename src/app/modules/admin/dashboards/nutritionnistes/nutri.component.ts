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
import { NutriService } from './nutri.service';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-nutri',
    templateUrl: './nutri.component.html',
    styleUrls: ['./nutri.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush, // Ensure OnPush strategy
})
export class NutriComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('nutriTable', { read: MatSort }) nutriTableMatSort: MatSort;

    data: any = { nutritionnistes: [], results: 0 }; // Initialize data
    nutriDataSource: MatTableDataSource<any> = new MatTableDataSource();
    nutriTableColumns: string[] = [
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
        private _nutriService: NutriService,
        private _dialog: MatDialog,
        private _cdr: ChangeDetectorRef // Inject ChangeDetectorRef for manual triggering
    ) {}

    ngOnInit(): void {
        this.loadNutris();
    }

    ngAfterViewInit(): void {
        this.nutriDataSource.sort = this.nutriTableMatSort;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    loadNutris(): void {
        this._nutriService
            .getNutris()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.data = data;
                this.nutriDataSource.data = data.nutritionnistes;
                this._cdr.markForCheck(); // Mark for check after updating data
            });
    }

    removeNutritionist(nutritionistId: string): void {
        const dialogRef = this._dialog.open(ConfirmDialogComponent, {
            data: {
                message: 'Are you sure you want to remove this nutritionist?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._nutriService
                    .removeCoach(nutritionistId)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(
                        () => {
                            // Update the view after removing a nutritionist
                            this.loadNutris();
                        },
                        (error) => {
                            console.error(
                                'Error removing nutritionist:',
                                error
                            );
                            // Optionally, show an error message to the user
                        }
                    );
            }
        });
    }

    trackByFn(index: number, item: any): any {
        return item._id || index;
    }
}
