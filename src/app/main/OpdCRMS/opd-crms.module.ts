import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  // {
  //   path: "phone-appointment",
  //   loadChildren: () => import("./phoneappointment/phoneappointment.module").then((m) => m.phoneappointmentModule),
  // },
  {
    path: "appointment",
    loadChildren: () => import("./appointment/appointment.module").then((m) => m.AppointmentModule),
  },
  // {
    
  //   path: "browse-opd-bills",
  //   loadChildren: () => import("./browse-opbill/browse-opbill.module").then((m) => m.BrowseOPBillModule),
  // },
  // {
  //   path: "bill",
  //   loadChildren: () => import("./op-search-list/opsearchlist.module").then((m) => m.opseachlistModule),
  // },
   
  {
    path: "registration",
    loadChildren: () => import("./case-detail/casedetail.module").then((m) => m.CasedetailModule),
  },
// {
//     path: "browse-opd-bills",
//     loadChildren: () => import("./browse-opbill/browse-opbill.module").then((m) => m.BrowseOPBillModule),
// },
// {
//     path: "browse-opd-payment-receipt",
//     loadChildren: () => import("./browse-payment-list/browsepayment.module").then((m) => m.browsepaymentModule),
// },
// {
//     path: "medicalrecords",
//     loadChildren: () => import("./op-search-list/opsearchlist.module").then((m) => m.opseachlistModule),
// },
// {
//     path: "bill",
//     loadChildren: () => import("./op-search-list/opsearchlist.module").then((m) => m.opseachlistModule),
// },

{
  path: "payment",
  // loadChildren: () =>import("./op-search-list/outstanding-payment/outstanding.module").then((m) => m.OutstandingModule),
  loadChildren: () =>import("./browse-credit-payment/credit-payment.module").then((m) => m.CreditPaymentModule),
},

];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes),
  ]
})
export class OPDCRMSModule { }
