import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReclamationDetailsService} from './reclamation-details.service';
import {AppConfig, Theme} from "../../../../core/config/app.config";
import {FuseConfigService} from "../../../../../@fuse/services/config";

@Component({
    selector: 'app-reclamation-details',
    templateUrl: './reclamation-details.component.html',
    styleUrls: ['./reclamation-details.component.scss']
})
export class ReclamationDetailsComponent implements OnInit {
    config: AppConfig;
    id: number;
    data: any = {};
    cmnts: any = [];
    clicked = false;
    searchKey: string = '';
    che = false ;

    constructor(
        private route: ActivatedRoute,
        private reclamationService: ReclamationDetailsService, private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.fetchReclamationDetails();
        this.getComments(this.data.userReclamation,this.id);}

    fetchReclamationDetails(): void {
        this.reclamationService.getReclamationById(this.id).subscribe({
            next: (data) => {
                this.data = data;
                this.cdr.markForCheck();
            }
        });
    }

    getComments(a: string, b: number): void {
        this.reclamationService.getCommentaires(a, b).subscribe({
            next: (data) => {
                this.cmnts = data;
                this.cdr.markForCheck();
                console.log(this.cmnts);
                this.che = true ;
            }
        });
    }
    delete(id : number ){
        this.reclamationService.deleteById(id).subscribe({
            next: () => {
                // Filter out the deleted item from this.data
                this.cmnts = this.cmnts.filter((r) => r._id !== id);
            },
            error: (error) => {
                console.error('Error deleting reclamation:', error);
                // Handle error as needed
            }
        });
    }
    markAsSatisfied(commentId: string) {
        this.reclamationService.updateCommentSelection(commentId, true)
            .subscribe((updatedComment) => {
                console.log('Marked as satisfied:', updatedComment);
                const commentIndex = this.cmnts.findIndex(c => c._id === commentId);
                if (commentIndex !== -1) {
                    this.cmnts[commentIndex].selection = true;
                    this.cdr.markForCheck(); // Trigger change detection
                }
            });
    }

    markAsUnsatisfied(commentId: string) {
        this.reclamationService.updateCommentSelection(commentId, false)
            .subscribe((updatedComment) => {
                console.log('Marked as unsatisfied:', updatedComment);
                const commentIndex = this.cmnts.findIndex(c => c._id === commentId);
                if (commentIndex !== -1) {
                    this.cmnts[commentIndex].selection = false;
                    this.cdr.markForCheck(); // Trigger change detection
                }
            });
    }

    updateReclamation(): void {

        // Call service to update
        this.reclamationService.updateReclamation(this.id, this.data).subscribe((response: any) => {
            console.log('Reclamation updated successfully:', response);
            this.clicked = false;
            alert('Reclamation updated successfully!');
        });
    }
}
