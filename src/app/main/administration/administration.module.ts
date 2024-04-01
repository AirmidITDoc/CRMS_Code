import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CaseIdDetailComponent } from '../dashboard/case-id-detail/case-id-detail.component';



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
  ]
})
export class AdministrationModule { }
