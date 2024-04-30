import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CaseIdDetailComponent } from '../dashboard/case-id-detail/case-id-detail.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CdkTableModule } from '@angular/cdk/table';
import { SharedModule } from '../shared/shared.module';


const appRoutes: Routes = [
  {
    path: "createuser",
    loadChildren: () => import("./new-createuser/createuser.module").then((m) => m.CreateuserModule),
  },
  {
    path: "configuration",
   loadChildren: () => import("./configration/congiration.module").then((m) => m.CongirationModule),
  },
  {
    path: "roletemplatemaster",
   loadChildren: () => import("./rolemaster/rolemaster.module").then((m) => m.RolemasterModule),
  },
 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    MatIconModule,MatTableModule,MatPaginatorModule,MatSortModule,
    MatCheckboxModule,MatButtonModule,CdkTreeModule,CdkTableModule,
    SharedModule
  ]
})
export class AdministrationModule { }
