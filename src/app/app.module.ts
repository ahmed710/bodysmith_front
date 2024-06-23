import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './core/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ReservationsModule } from './features/reservations/reservations.module';
import { SessionsModule } from './features/sessions/sessions.module'; 
import { CoachesModule } from './features/coaches/coaches.module'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,  // Ensure HttpClientModule is imported for making HTTP requests
    CoreModule,
    SharedModule,
    AppRoutingModule,
    ReservationsModule,
    SessionsModule,
    CoachesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
