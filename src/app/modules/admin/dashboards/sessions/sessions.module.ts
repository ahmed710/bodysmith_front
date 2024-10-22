import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsComponent } from './sessions.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import {AddSeanceFormModule} from "../add-seance/add-seance-form.module"; // Import ReactiveFormsModule if needed


@NgModule({
  declarations: [
    SessionsComponent
  ],
  imports: [
    CommonModule,
    SessionsRoutingModule,
    MatTableModule,
    AddSeanceFormModule,
    ReactiveFormsModule
  ]
})
export class SessionsModule { }
