import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    {
        path: "department-master",
        loadChildren: () =>
            import("./department/department-master/department-master.module").then(
                (m) => m.DepartmentMasterModule
            ),
    },
   
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(appRoutes)],
})
export class DepartmentMasterModule { }
