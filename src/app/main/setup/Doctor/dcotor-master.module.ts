import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    {
        path: "doctortype-master",
        loadChildren: () =>
            import("./doctor-type-master/doctor-type.module").then(
                (m) => m.DoctorTypeModule
            ),
    },
    {
        path: "doctor-master",
        loadChildren: () =>
            import("./doctor-master/doctor.module").then(
                (m) => m.DoctorModule
            ),
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(appRoutes)],
})
export class DcotorMasterModule { }
