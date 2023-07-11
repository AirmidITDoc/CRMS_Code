import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponserInformationComponent } from './sponser-information.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: "**",
      component: SponserInformationComponent,
  },
];

@NgModule({
  declarations: [SponserInformationComponent],
  imports: [ 
    RouterModule.forChild(routes),
    CommonModule
  ],
  entryComponents: [SponserInformationComponent],
})
export class SponserinformationModule { }
