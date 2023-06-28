import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
    {
        path: "personaldetail",
        loadChildren: () =>
            import("./Master/master.module").then(
                (m) => m.MasterModule
            ),
    },
    {
        path: "billing",
        loadChildren: () =>
            import("./billing/billing.module").then((m) => m.BillingModule),
    },
    {
        path: "department",
        loadChildren: () =>
            import("./Department/department-master.module").then(
                (m) => m.DepartmentMasterModule
            ),
    },
    {
        path: "doctor",
        loadChildren: () =>
            import("./Doctor/dcotor-master.module").then((m) => m.DcotorMasterModule),
    },
];

@NgModule({
    declarations: [
   
],
    imports: [
        RouterModule.forChild(appRoutes),
    ]
})
export class SetupModule {
}
