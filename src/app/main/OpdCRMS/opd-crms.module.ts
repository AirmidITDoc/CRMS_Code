import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowsePaymentReceiptComponent } from './browse-payment-receipt/browse-payment-receipt.component';


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
  {
    path: "bill",
    loadChildren: () => import("./appointment/appointment.module").then((m) => m.AppointmentModule),
  },
   
  {
    path: "registration",
    loadChildren: () => import("./case-detail/casedetail.module").then((m) => m.CasedetailModule),
  },
{
    path: "browse-opd-bills",
    loadChildren: () =>import("./browse-credit-payment/credit-payment.module").then((m) => m.CreditPaymentModule),
},
{
    path: "browse-opd-payment-receipt",
    loadChildren: () => import("./browse-payment-receipt/browse-paymentreceipt.module").then((m) => m.BrowsePaymentreceiptModule),
},
{
    path: "medicalrecords",
    loadChildren: () => import("./appointment/appointment.module").then((m) => m.AppointmentModule),
},


{
  path: "payment",
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
