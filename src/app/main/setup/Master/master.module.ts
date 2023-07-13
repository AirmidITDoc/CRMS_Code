import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PatientTypeMasterComponent } from './patient-type-master/patient-type-master.component';
import { AreaMasterComponent } from './area-master/area-master.component';
import { SponserInformationComponent } from './sponser-information/sponser-information.component';
import { InstitutionInformationComponent } from './institution-information/institution-information.component';
import { MemberMasterComponent } from './member-master/member-master.component';
import { NewMemberMasterComponent } from './member-master/new-member-master/new-member-master.component';
import { CommitteeMemberComponent } from './committee-member/committee-member.component';
import { NewCommitteeMemberComponent } from './committee-member/new-committee-member/new-committee-member.component';

const appRoutes: Routes = [
    {
        path: "city-master",
        loadChildren: () =>
            import("./city-master/city-master.module").then(
                (m) => m.CityMasterModule
            ),
    },
    {
        path: "prefix-master",
        loadChildren: () =>
            import("./prefix-master/prefix-master.module").then(
                (m) => m.PrefixMasterModule
            ),
    },
    {
        path: "gender-master",
        loadChildren: () =>
            import("./gender-master/gender-master.module").then(
                (m) => m.GenderMasterModule
            ),
    },
    {
        path: "patient-type-master",
        loadChildren: () =>
            import("./patient-type-master/patient-type.module").then(
                (m) => m.PatientTypeModule
            ),
    },
    {
        path: "relationship-master",
        loadChildren: () =>
            import("./relation-ship-master/relatioshio-master.module").then(
                (m) => m.RelatioshioMasterModule
            ),
    },
    {
        path: "marital-master",
        loadChildren: () =>
            import("./maritalstatus-master/maritalstatus-master.module").then(
                (m) => m.MaritalstatusMasterModule
            ),
    },
    {
        path: "religion-master",
        loadChildren: () =>
            import("./religion-master/religion-master.module").then(
                (m) => m.ReligionMasterModule
            ),
    },

    {
        path: "country-master",
        loadChildren: () =>
            import("./country-master/country-master.module").then(
                (m) => m.CountryMasterModule
            ),
    },
    {
        path: "state-master",
        loadChildren: () =>
            import("./state-master/state-master.module").then(
                (m) => m.StateMasterModule
            ),
    },
   
    {
        path: "area-master",
        loadChildren: () =>
            import("./area-master/area-master.module").then(
                (m) => m.AreaMasterModule
            ),
    },
    {
        path: "SponserInformation",
        loadChildren: () =>
            import("./sponser-information/sponserinformation.module").then(
                (m) => m.SponserinformationModule
            ),
    },
    {
        path: "InstitutionInformation",
        loadChildren: () =>
            import("./institution-information/institution-information.module").then(
                (m) => m.InstitutionInformationModule
            ),
    },
    {
        path: "MemberMaster",
        loadChildren: () =>
            import("./member-master/member-master.module").then(
                (m) => m.MemberMasterModule
            ),
            
    },
    {
        path: "CommitteeMember",
        loadChildren: () =>
            import("./committee-member/committee-member.module").then(
                (m) => m.CommitteeMemberModule
            ),
    },
   
   
];

@NgModule({
    declarations: [CommitteeMemberComponent, NewCommitteeMemberComponent],
    imports: [RouterModule.forChild(appRoutes)],
})
export class MasterModule { }
