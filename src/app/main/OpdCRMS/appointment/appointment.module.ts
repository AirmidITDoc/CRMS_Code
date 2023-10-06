import { AppointmentComponent } from './appointment.component';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from 'app/main/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatNestedTreeNode, MatTree, MatTreeModule } from '@angular/material/tree';
import { AppointmentService } from './appointment.service';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
// import { EditVisitDateComponent } from './edit-visit-date/edit-visit-date.component';
import { NewVistDateComponent } from './new-vist-date/new-vist-date.component';
import { InvoiceBillMappingComponent } from './invoice-bill-mapping/invoice-bill-mapping.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { ViewFinancialSummarybudgetComponent } from './invoice-bill-mapping/view-financial-summarybudget/view-financial-summarybudget.component';
import { BrowseInvoiceListComponent } from './browse-invoice-list/browse-invoice-list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { PatientScreenBillDetailComponent } from './patient-screen-bill-detail/patient-screen-bill-detail.component';
import { AssignVisitInforComponent } from './assign-visit-infor/assign-visit-infor.component';
import { ResultComponent } from './Document/result/result.component';
import { CardiacFactorComponent } from './Document/cardiac-factor/cardiac-factor.component';
import { LesionPreprationComponent } from './Document/lesion-prepration/lesion-prepration.component';
import { ProcedureHemodynamicsComponent } from './Document/procedure-hemodynamics/procedure-hemodynamics.component';
import { DempgraphicComponent } from './Document/dempgraphic/dempgraphic.component';
import { PresentationComponent } from './Document/presentation/presentation.component';
import { DocPresentationComponent } from './Document/doc-presentation/doc-presentation.component';
import { NewDocRegistrationComponent } from './Document/new-doc-registration/new-doc-registration.component';
import { NewDocumentComponent } from './Document/new-document/new-document.component';


const routes: Routes = [
    {
        path: '**',
        component: AppointmentComponent,
    },
];
@NgModule({
    declarations: [
        AppointmentComponent,
        NewAppointmentComponent,
        EditAppointmentComponent,
        BillDetailComponent,
        PaymentDetailComponent,
         NewVistDateComponent,
        InvoiceBillMappingComponent,
        UploadDocumentComponent,
        ViewFinancialSummarybudgetComponent,
        FileUploadComponent,
        ImageUploadComponent,
        PatientScreenBillDetailComponent,
        AssignVisitInforComponent,
        ResultComponent,
        CardiacFactorComponent,
        LesionPreprationComponent,
        ProcedureHemodynamicsComponent,
        DempgraphicComponent,
        PresentationComponent,
        //   NewDocRegistrationComponent,
    //   DocPresentationComponent,
    //   NewDocumentComponent
        
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
        MatTabsModule,
        MatCardModule,
        MatDividerModule,  
        MatProgressSpinnerModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        MatDialogModule,
        MatListModule,
        MatSnackBarModule,
        MatSlideToggleModule ,
        MatDividerModule,
        MatDialogModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatStepperModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
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
        MatRadioModule
        // NgxMaterialTimepickerModule
        
    ],
    providers: [
        AppointmentService,
        DatePipe
    ],
    entryComponents: [
        AppointmentComponent,
    ]
})
export class AppointmentModule { }
