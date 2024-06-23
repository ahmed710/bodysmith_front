// src/app/features/sessions/sessions.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsService } from './sessions.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SessionsService
  ]
})
export class SessionsModule { }
