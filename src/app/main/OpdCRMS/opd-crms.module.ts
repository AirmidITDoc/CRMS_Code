import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  
  {
    path: "appointment",
    loadChildren: () => import("./appointment/appointment.module").then((m) => m.AppointmentModule),
  },
  {
    path: "appoinmentwithbill",
    loadChildren: () => import("../committee-meeting/committe-meeting.module").then((m) => m.CommitteMeetingModule),
  },
  {
    path: "bill",
    // loadChildren: () => import("./appointment/appointment.module").then((m) => m.AppointmentModule),
    loadChildren: () => import("../committee-meeting/committe-meeting.module").then((m) => m.CommitteMeetingModule),
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
    // loadChildren: () =>
    // import("../administration/administration.module" ).then((m) => m.AdministrationModule),

},
{
    path: "refund",
    loadChildren: () => import("../OpdCRMS/appointment/browse-invoice-list/invoice-bill.module").then((m) => m.InvoiceBillModule),
  },

{
  path: "payment",
  loadChildren: () =>import("./bill-settlement/bill-settlement.module").then((m) => m.BillSettlementModule),
},

{
  path: "Clinical Document",
  loadChildren: () => import("../OpdCRMS/appointment/Document/clinical-document.module").then((m) => m.ClinicalDocumentModule),
},

];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes),
  ]
})
export class OPDCRMSModule { }
