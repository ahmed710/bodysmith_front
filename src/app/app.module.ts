import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { ReclamationDetailsComponent } from './modules/admin/dashboards/reclamation-details/reclamation-details.component';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {NgApexchartsModule} from "ng-apexcharts";
import { AddReclamationComponent } from './modules/admin/dashboards/add-reclamation/add-reclamation.component';
import { CommentaireComponent } from './modules/admin/dashboards/commentaire/commentaire.component';
import { AddProductComponent } from './modules/admin/dashboards/add-product/add-product.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AddCategoryComponent } from './modules/admin/dashboards/add-category/add-category.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSidenavModule} from "@angular/material/sidenav";

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        MatButtonModule,
        MatMenuModule,
        NgApexchartsModule,
        ReactiveFormsModule,
        AddProductComponent,
        AddCategoryComponent,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatCardModule,
        MatGridListModule,
        MatSidenavModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
