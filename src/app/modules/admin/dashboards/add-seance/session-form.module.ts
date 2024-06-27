import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSeanceFormComponent } from './session-form.component';
import {RouterModule} from "@angular/router";
import {analyticsRoutes} from "../analytics/analytics.routing";
import {sessionFormRoutes} from "./session-form.routing";

@NgModule({
  declarations: [
    AddSeanceFormComponent
  ],
  imports: [
      RouterModule.forChild(sessionFormRoutes),
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AddSeanceFormComponent
  ]
})
export class SessionFormModule {}
