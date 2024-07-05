import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddReclamationService} from "./add-reclamation.service";

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.scss']
})
export class AddReclamationComponent {
    constructor(private consumer:AddReclamationService){}
    reclamation: FormGroup = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        email: new FormControl('', [Validators.required]),
        numTelReclamation: new FormControl(0, [
            Validators.required,
            Validators.pattern('[0-9]+'),
        ]),
    });

    add() {
        console.log(this.reclamation.value);
        this.consumer.addReclamation(this.reclamation.value).subscribe({
            next: ()=> alert('Added successfuly')
        })
    }
}
