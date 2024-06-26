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
import { NutriService } from './users.service';

@Component({
    selector: 'app-nutri',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatSort) coachTableMatSort: MatSort;

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

    constructor(private _coachService: NutriService) {}

    ngOnInit(): void {
        this._coachService
            .getNutris()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.data = data;
                this.coachDataSource.data = data.data; // Update to data.data
                console.log(data);
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
