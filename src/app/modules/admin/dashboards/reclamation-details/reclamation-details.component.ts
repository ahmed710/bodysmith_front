import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {takeUntil} from "rxjs";
import {ReclamationService} from "../reclamation/reclamation.service";
import {ReclamationDetailsService} from "./reclamation-details.service";
@Component({
  selector: 'app-reclamation-details',
  templateUrl: './reclamation-details.component.html',
  styleUrls: ['./reclamation-details.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReclamationDetailsComponent{
    id!: number;
    data: any;
    clicked = false ;
    constructor(private ar: ActivatedRoute,private _reclamationDetailsService : ReclamationDetailsService) {
        this.id = this.ar.snapshot.params['id'];
        console.log(this.id);
        this.data = this._reclamationDetailsService.getReclamationById(this.ar.snapshot.params['id']).subscribe({
            next : (data) => this.data = data
        });
        console.log(this.data);
    }
    getData(){
        this.clicked=true ;
    }
}
