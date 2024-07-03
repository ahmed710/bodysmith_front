import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Router} from "@angular/router";
import {ReclamationService} from "./reclamation.service";
import {Subject, takeUntil} from "rxjs";
import {ApexOptions} from "ng-apexcharts";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {FinanceService} from "../finance/finance.service";

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReclamationComponent implements OnInit, AfterViewInit, OnDestroy{
    @ViewChild('recentTransactionsTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;
    searchKey: string = '';
    data: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['title','description', 'date', 'email', 'numTelReclamation', 'Traiter','etat','button','delete','actions'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private _reclamationService: ReclamationService, private _changeDetectorRef: ChangeDetectorRef)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the data
        this._reclamationService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {

                // Store the data
                this.data = data;

                // Store the table data
                this.recentTransactionsDataSource.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });

    }

    /**
     * After view init
     */
    searchReclamation(): void {
        if (!this.searchKey.trim()) {
            alert('Entrez une chaine non vide svp,voici tous les données');
            this._reclamationService.data$
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((data) => {

                    // Store the data
                    this.data = data;

                    // Store the table data
                    this.recentTransactionsDataSource.data = data;
                    this._changeDetectorRef.markForCheck();
                    // Prepare the chart data
                    this._prepareChartData();
                });
            return;
        }

        this._reclamationService.searchReclamation(this.searchKey).subscribe((reclamations: any) => {
            // Assuming you handle the search results accordingly, for example:
            console.log('Search results:', reclamations);
            this.data = reclamations;
            this.recentTransactionsDataSource.data = reclamations;
            // Optionally, update UI or store search results
        }, error => {
            console.error('Error searching:', error);
            // Handle error as needed
        });
    }
    traiter(id: number): void {
        this._reclamationService.traiterReclamation(id).subscribe({
            next: (response) => {
                // Handle success as needed
                console.log('Reclamation traitée:', response);
                this.updateData();
            },
            error: (error) => {
                console.error('Error traiter reclamation:', error);
                // Handle error as needed
            }
        });
    }

    ouvrire(id: number): void {
        this._reclamationService.ouvrireReclamation(id).subscribe({
            next: (response) => {
                // Handle success as needed
                console.log('Reclamation ouverte:', response);
                this.updateData();
            },
            error: (error) => {
                console.error('Error ouvrir reclamation:', error);
                // Handle error as needed
            }
        });
    }

    fermer(id: number): void {
        this._reclamationService.fermerReclamation(id).subscribe({
            next: (response) => {
                // Handle success as needed
                console.log('Reclamation fermée:', response);
                this.updateData();
            },
            error: (error) => {
                console.error('Error fermer reclamation:', error);
                // Handle error as needed
            }
        });
    }
    private updateData(): void {
        this._reclamationService.getData().subscribe((data) => {
            this.data = data;
            this.recentTransactionsDataSource = data;
            this._changeDetectorRef.markForCheck();
        });
    }

    ngAfterViewInit(): void
    {
        // Make the data source sortable
        this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;
    }
    delete(id: number): void {
        this._reclamationService.deleteById(id).subscribe({
            next: () => {
                // Filter out the deleted item from this.data
                this.data = this.data.filter((r) => r._id !== id);

                // Update MatTableDataSource with the filtered data
                this.recentTransactionsDataSource.data = this.data;
            },
            error: (error) => {
                console.error('Error deleting reclamation:', error);
                // Handle error as needed
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void
    {
        // Account balance
        this.accountBalanceOptions = {
            chart  : {
                animations: {
                    speed           : 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                width     : '100%',
                height    : '100%',
                type      : 'area',
                sparkline : {
                    enabled: true
                }
            },
            colors : ['#A3BFFA', '#667EEA'],
            fill   : {
                colors : ['#CED9FB', '#AECDFD'],
                opacity: 0.5,
                type   : 'solid'
            },
            series : this.data.accountBalance.series,
            stroke : {
                curve: 'straight',
                width: 2
            },
            tooltip: {
                followCursor: true,
                theme       : 'dark',
                x           : {
                    format: 'MMM dd, yyyy'
                },
                y           : {
                    formatter: (value): string => value + '%'
                }
            },
            xaxis  : {
                type: 'datetime'
            }
        };
    }
}
