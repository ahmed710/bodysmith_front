import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import {ReclamationDetailsComponent} from "./reclamation-details.component";
import {ReclamationDetailsRoutes} from "./reclamation-details.routing";
import {MatLegacyCardModule} from "@angular/material/legacy-card";
import {MatCardModule} from "@angular/material/card";

@NgModule({
    declarations: [
        ReclamationDetailsComponent
    ],
    imports: [
        RouterModule.forChild(ReclamationDetailsRoutes),
        SharedModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatCardModule
    ]
})
export class ReclamationDetailsModule
{
}
