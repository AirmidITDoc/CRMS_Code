import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AreaMasterComponent } from "./area-master.component";
import { RouterModule, Routes } from "@angular/router";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatRadioModule } from "@angular/material/radio";
import { FuseSharedModule } from "@fuse/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SharedModule } from "app/main/shared/shared.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { AreaMasterService } from "./area-master.service";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { FuseConfirmDialogModule, FuseSidebarModule } from "@fuse/components";

const routes: Routes = [
    {
        path: "**",
        component: AreaMasterComponent,
    },
];

@NgModule({
    declarations: [AreaMasterComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatRadioModule,
        MatTabsModule,
        MatCardModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatStepperModule,
        NgxMatSelectSearchModule,
    ],
    providers: [AreaMasterService],
    entryComponents: [AreaMasterComponent],
})
export class AreaMasterModule { }
