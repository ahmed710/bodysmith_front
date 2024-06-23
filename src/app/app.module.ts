import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './core/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ReservationsModule } from './features/reservations/reservations.module';
import { SessionsModule } from './features/sessions/sessions.module'; 
import { CoachesModule } from './features/coaches/coaches.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, // Garder cette importation unique
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    ReservationsModule,
    SessionsModule,
    CoachesModule,
    MatSidenavModule, 
    MatToolbarModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
