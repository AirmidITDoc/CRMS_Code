import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CaseIdDetailComponent } from '../dashboard/case-id-detail/case-id-detail.component';
import { NewCreateuserComponent } from './new-createuser/new-createuser.component';
import { RolemasterComponent } from './rolemaster/rolemaster.component';



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
   loadChildren: () => import("./role-template/role-template.module").then((m) => m.RoleTemplateModule),
  },
 
];

@NgModule({
  declarations: [NewCreateuserComponent, RolemasterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
  ]
})
export class AdministrationModule { }
