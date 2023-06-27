import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseConfirmDialogModule, FuseSidebarModule } from "@fuse/components";
import { NotificationServiceService } from "app/core/notification-service.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RelationShipMasterService } from "./relation-ship-master.service";
import { RelationShipMasterComponent } from "./relation-ship-master.component";


const routes: Routes = [
    {
        path: "**",
        component: RelationShipMasterComponent,
    },
];

@NgModule({
    declarations: [RelationShipMasterComponent],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,

        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        MatTableModule,

        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatRadioModule,
        MatSnackBarModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
    ],
    providers: [RelationShipMasterService, NotificationServiceService],

    entryComponents: [RelationShipMasterComponent]
})
export class RelatioshioMasterModule { }
