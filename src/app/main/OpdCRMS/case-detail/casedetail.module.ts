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
import { MatNestedTreeNode, MatTree, MatTreeModule } from '@angular/material/tree';
import { NewCaseDetailComponent } from './new-case-detail/new-case-detail.component';
import { CaseDetailComponent } from './case-detail.component';
import { CasedetailService } from './casedetail.service';
import { EditCasedetailComponent } from './edit-casedetail/edit-casedetail.component';
import { StudySchduleComponent } from './study-schdule/study-schdule.component';
import { StudyDetailComponent } from './study-detail/study-detail.component';
import { StudyServicesComponent } from './study-sevices/study-services.component';

const routes: Routes = [
    {
        path: '**',
        component: CaseDetailComponent,
    },
];
@NgModule({
    declarations: [
        CaseDetailComponent,
        NewCaseDetailComponent,
        EditCasedetailComponent,
        StudySchduleComponent,
        StudyDetailComponent,
        StudyServicesComponent,
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
        MatTooltipModule,
        MatExpansionModule,
        MatListModule,
        // TreeViewComponent,
        MatTreeModule,
    ],
    providers: [
        CasedetailService,
        DatePipe
    ],
    entryComponents: [
        CaseDetailComponent
    ]
})
export class CasedetailModule { }
