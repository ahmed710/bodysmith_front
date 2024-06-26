import {
    AfterViewInit,
    ChangeDetectionStrategy,
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
import { CoachService } from './coaches.service';

@Component({
    selector: 'app-coach',
    templateUrl: './coaches.component.html',
    styleUrls: ['./coaches.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoachComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('coachTable', { read: MatSort }) coachTableMatSort: MatSort;

    data: any;
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
        'button',
    ];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _coachService: CoachService) {}

    ngOnInit(): void {
        this._coachService
            .getCoaches()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.data = data;
                this.coachDataSource.data = data.coaches;
            });
    }

    ngAfterViewInit(): void {
        this.coachDataSource.sort = this.coachTableMatSort;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any {
        return item._id || index;
    }
}
