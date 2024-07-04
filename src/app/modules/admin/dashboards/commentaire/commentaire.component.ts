import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { CommentaireService } from './commentaire.service';

@Component({
    selector: 'app-commentaire',
    templateUrl: './commentaire.component.html',
    styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit, OnDestroy {
    data: any[] = []; // Assuming data is an array of objects with a 'libelle' property
    selectedService: string;
    newServiceName: string = '';
    editServiceName: string = '';
    searchKey: string = '';

    private unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private commentaireService: CommentaireService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.fetchServices();
    }

    fetchServices(): void {
        this.commentaireService.getData()
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(
                (data) => {
                    this.data = data;
                    this.cdr.markForCheck(); // Trigger change detection
                },
                (error) => {
                    console.error('Error fetching services:', error);
                }
            );
    }

    addService(): void {
        if (!this.newServiceName.trim()) {
            return;
        }

        this.commentaireService.addService({ libelle: this.newServiceName })
            .pipe(
                takeUntil(this.unsubscribe$),
                catchError(error => {
                    console.error('Error adding service:', error);
                    return [];
                })
            )
            .subscribe(() => {
                this.newServiceName = ''; // Clear input field
                this.fetchServices(); // Refresh the list of services
            });
    }

    updateService(serviceId: string): void {
        const updatedService = { libelle: this.editServiceName };

        this.commentaireService.updateService(serviceId, updatedService)
            .pipe(
                takeUntil(this.unsubscribe$),
                catchError(error => {
                    console.error('Error updating service:', error);
                    return [];
                })
            )
            .subscribe(() => {
                this.editServiceName = ''; // Clear input field
                this.fetchServices(); // Refresh the list of services
            });
    }

    deleteService(serviceId: string): void {
        this.commentaireService.deleteService(serviceId)
            .pipe(
                takeUntil(this.unsubscribe$),
                catchError(error => {
                    console.error('Error deleting service:', error);
                    return [];
                })
            )
            .subscribe(() => {
                this.fetchServices(); // Refresh the list of services
            });
    }

    searchServices(): void {
        if (!this.searchKey.trim()) {
            this.fetchServices(); // Reset to fetch all services
            return;
        }

        this.commentaireService.searchServices(this.searchKey)
            .pipe(
                takeUntil(this.unsubscribe$),
                catchError(error => {
                    console.error('Error searching services:', error);
                    return [];
                })
            )
            .subscribe((data) => {
                this.data = data;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
