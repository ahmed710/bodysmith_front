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
import { NutriService } from './nutri.service';

@Component({
    selector: 'app-nutri',
    templateUrl: './nutri.component.html',
    styleUrls: ['./nutri.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutriComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('nutriTable', { read: MatSort }) nutriTableMatSort: MatSort;

    data: any;
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
        'button',
    ];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _nutriService: NutriService) {}

    ngOnInit(): void {
        this._nutriService
            .getNutris()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.data = data;
                this.nutriDataSource.data = data.nutritionnistes;
            });
    }

    ngAfterViewInit(): void {
        this.nutriDataSource.sort = this.nutriTableMatSort;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any {
        return item._id || index;
    }
}
