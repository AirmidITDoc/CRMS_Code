import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionInformationComponent } from './institution-information.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: "**",
      component: InstitutionInformationComponent,
  },
];

@NgModule({
  declarations: [InstitutionInformationComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  entryComponents: [InstitutionInformationComponent],
})
export class InstitutionInformationModule { }
