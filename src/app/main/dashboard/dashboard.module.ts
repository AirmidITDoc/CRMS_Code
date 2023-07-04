

import { PathologyDashboardComponent } from './pathology-dashboard/pathology-dashboard.component';
import { RadiologyDashboardComponent } from './radiology-dashboard/radiology-dashboard.component';
import { CashlessDashboardComponent } from './cashless-dashboard/cashless-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseConfirmDialogModule, FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from './dashboard.service';
import { DailyDashboardComponent } from './daily-dashboard/daily-dashboard.component';
import { CaseIdDetailComponent } from './case-id-detail/case-id-detail.component';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SharedModule } from '../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';



@NgModule({
  declarations: [
    DailyDashboardComponent,
    CaseIdDetailComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    FuseSharedModule,
    ChartsModule,
    NgxChartsModule,
    FuseWidgetModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
       MatInputModule,
   
    MatRippleModule,
    MatToolbarModule,

    MatSortModule,
    MatCardModule,
    MatDividerModule,  
    FuseConfirmDialogModule,
    FuseSidebarModule,
    MatDialogModule,
    MatListModule,
    MatSnackBarModule,
    MatSlideToggleModule ,
    MatDividerModule,
    MatDialogModule,

    FuseConfirmDialogModule,
    FuseSidebarModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatStepperModule,
    MatAutocompleteModule,

    SharedModule,
    NgxMatSelectSearchModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule,
    MatChipsModule,
    MatExpansionModule,
    MatListModule,
    MatTreeModule,
  ],
  providers: [
    DashboardService,
    DatePipe
  ],
  entryComponents: [DailyDashboardComponent]
})
export class DashboardModule { }
