import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
      path: "createuser",
      loadChildren: () => import("./create-user/create-user.module").then((m) => m.CreateUserModule),
  },
  // {
  //   path: "configuration",
  //  loadChildren: () => import("./system-configuration/system-configuration.module").then((m) => m.SystemConfigurationModule),
  // },
  {
    path: "roletemplatemaster",
   loadChildren: () => import("./role-template/role-template.module").then((m) => m.RoleTemplateModule),
  },
 
];


@NgModule({
  declarations: [
    ],
  imports: [
    RouterModule.forChild(appRoutes),
  ]
})
export class AdministrationModule { }
