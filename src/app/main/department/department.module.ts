import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationServiceService } from 'app/core/notification-service.service';
import { DepartmentComponent } from './department.component';
import { DepartmentService } from './department.service';
// import { DepartmentTypeComponent } from './department-type/department-type.component';//
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NewDocDpartmentComponent } from './new-doc-dpartment/new-doc-dpartment.component';

const routes: Routes = [
    {
        path: '**',
        component: DepartmentComponent,
        
    }
];

@NgModule({
    declarations: [
        DepartmentComponent,
        // DepartmentTypeComponent,
        NewDocDpartmentComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatRadioModule,
        MatSnackBarModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        MatButtonModule,
        CommonModule,
        MatExpansionModule,
        MatCardModule,
        MatSlideToggleModule ,

        MatTabsModule,
         MatDividerModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatStepperModule,
        // WebcamModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatDialogModule,
        MatGridListModule,
        MatListModule,
        SharedModule,
        NgxMatSelectSearchModule,
        MatAutocompleteModule,
        MatListModule,
        MatTooltipModule,
        MatRadioGroup
    ],
     providers: [
        DepartmentService,
       NotificationServiceService 
     ],
    entryComponents: [
        DepartmentComponent
    ]
})
export class DepartmentModule { }
