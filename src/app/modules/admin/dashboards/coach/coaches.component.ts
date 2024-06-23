import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { CoachesService } from './coaches.service';

@Component({
    selector       : 'coaches',
    templateUrl    : './coaches.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoachesComponent {}
// {
//     @ViewChild('coachesTable', {read: MatSort}) coachesTableMatSort: MatSort;
//
//     data: any;
//     coachesDataSource: MatTableDataSource<any> = new MatTableDataSource();
//     coachesTableColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'speciality'];
//     private _unsubscribeAll: Subject<any> = new Subject<any>();
//
//     /**man
//      * Constructor
//      */
//     constructor(private _coachesService: CoachesService)
//     {
//     }
//
//     ngOnInit(): void
//     {
//         // Get the data
//         this._coachesService.data$
//             .pipe(takeUntil(this._unsubscribeAll))
//             .subscribe((data) => {
//                 // Store the data
//                 this.data = data;
//
//                 // Store the table data
//                 this.coachesDataSource.data = data.coaches;
//             });
//     }
//
//     ngAfterViewInit(): void
//     {
//         // Make the data source sortable
//         this.coachesDataSource.sort = this.coachesTableMatSort;
//     }
//
//     ngOnDestroy(): void
//     {
//         // Unsubscribe from all subscriptions
//         this._unsubscribeAll.next(null);
//         this._unsubscribeAll.complete();
//     }
//
//     trackByFn(index: number, item: any): any
//     {
//         return item.id || index;
//     }
// }
