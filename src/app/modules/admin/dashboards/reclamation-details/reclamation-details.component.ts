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

    updateReclamation(): void {

        // Call service to update
        this.reclamationService.updateReclamation(this.id, this.data).subscribe((response: any) => {
            console.log('Reclamation updated successfully:', response);
            this.clicked = false;
            alert('Reclamation updated successfully!');
        });
    }
}
