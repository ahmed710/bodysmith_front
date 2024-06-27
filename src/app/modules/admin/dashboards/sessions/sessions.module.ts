import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {sessionRoutes} from './sessions-routing.routing';
import { SessionsComponent } from './sessions.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import {SessionFormModule} from "../add-seance/session-form.module";
import {RouterModule} from "@angular/router";
import {projectRoutes} from "../project/project.routing"; // Import ReactiveFormsModule if needed


@NgModule({
  declarations: [
    SessionsComponent
  ],
  imports:[
      RouterModule.forChild(sessionRoutes),
    CommonModule,
    MatTableModule,
    SessionFormModule,
    ReactiveFormsModule
  ]
})
export class SessionsModule { }
