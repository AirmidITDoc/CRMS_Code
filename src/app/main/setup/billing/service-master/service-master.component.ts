import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { fuseAnimations } from "@fuse/animations";
import { ServiceMasterService } from "./service-master.service";
import { MatDialog } from "@angular/material/dialog";
import { ServiceMasterFormComponent } from "./service-master-form/service-master-form.component";

@Component({
    selector: "app-service-master",
    templateUrl: "./service-master.component.html",
    styleUrls: ["./service-master.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ServiceMasterComponent implements OnInit {
    submitted = false;
    registerObj = new ServiceMaster({});
    RadiologytemplateMasterList: any;
    isLoading = true;
    msg: any;
    

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = [
        "ServiceId",
        "ServiceName",
        // "GroupName",
        "ServiceShortDesc",
        "PrintOrder",
        // "FirstName",
        "EmgAmt",
        "EmgPer",
        "AddedByName",
        "IsEditable",
        "CreditedtoDoctor",
        "IsDeleted",
        "action",
    ];

    DSServiceMasterList = new MatTableDataSource<ServiceMaster>();

    constructor(
        public _serviceMasterService: ServiceMasterService,

        public _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getServiceMasterList();
    }
   
    get f() {
        return this._serviceMasterService.myform.controls;
    }

    getServiceMasterList() {
        var m={
                     
                "ServiceName":'%',       
               "TariffId":1
            //    "GroupId":1      
                 
        };
        this._serviceMasterService.getServiceMasterList(m).subscribe(
            (Menu) => {
                this.DSServiceMasterList.data = Menu as ServiceMaster[];
                this.isLoading = false;
                this.DSServiceMasterList.sort = this.sort;
                this.DSServiceMasterList.paginator = this.paginator;
            },
            (error) => (this.isLoading = false)
        );
    }

    onClear() {
        this._serviceMasterService.myform.reset({ IsDeleted: "false" });
        this._serviceMasterService.initializeFormGroup();
    }

    

    onEdit1(){}
    onEdit(row) {
        debugger;
        console.log(row)
        var m_data = {
            ServiceId: row.ServiceId,
            ServiceShortDesc: row.ServiceShortDesc.trim(),
            ServiceName: row.ServiceName.trim(),
            Price: row.Price,
            IsEditable: JSON.stringify(row.IsEditable),
            CreditedtoDoctor: JSON.stringify(row.CreditedtoDoctor),
            IsPathology: JSON.stringify(row.IsPathology),
            IsRadiology: JSON.stringify(row.IsRadiology),
            IsDeleted: JSON.stringify(row.IsDeleted),
            PrintOrder: row.PrintOrder,
            IsPackage: JSON.stringify(row.IsPackage),
            SubGroupId: row.SubGroupId,
            DoctorId: row.DoctorId,
            IsEmergency: JSON.stringify(row.IsEmergency),
            EmgAmt: row.EmgAmt,
            EmgPer: row.EmgPer,
            IsDocEditable: JSON.stringify(row.IsDocEditable),
            UpdatedBy: row.UpdatedBy,
        };

        console.log(m_data);
        this._serviceMasterService.populateForm(m_data);

        const dialogRef = this._matDialog.open(ServiceMasterFormComponent, {
            maxWidth: "80vw",
            maxHeight: "850px",
            width: "100%",
                   
            data: {
                ServiceId:row.ServiceId,
                IsSubmitFlag: true,
                registerObj:m_data
              }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed - Insert Action", result);
            this.getServiceMasterList();
        });
    }

    onAdd() {
        const dialogRef = this._matDialog.open(ServiceMasterFormComponent, {
            maxWidth: "80vw",
            maxHeight: "95vh",
            width: "100%",
            height: "100%",
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.getServiceMasterList();
        });
    }
}

export class ServiceMaster {
    ServiceId: number;
    GroupId: number;
    ServiceShortDesc: string;
    ServiceName: string;
    Price: number;
    IsEditable: boolean;
    CreditedtoDoctor: boolean;
    IsPathology:  boolean;
    IsRadiology: boolean;
    IsDeleted: boolean;
    PrintOrder: number;
    IsPackage: boolean;
    SubGroupId: number;
    DoctorId: number;
    IsEmergency: boolean;
    EmgAmt: number;
    EmgPer: number;
    IsDocEditable: boolean;
    AddedBy: number;
    UpdatedBy: number;
    AddedByName: string;
    currentDate = new Date();
    EffectiveDate:any;
    /**
     * Constructor
     *
     * @param ServiceMaster
     */
    constructor(ServiceMaster) {
        {
            this.ServiceId = ServiceMaster.ServiceId || "";
            this.GroupId = ServiceMaster.GroupId || "";
            this.ServiceShortDesc = ServiceMaster.ServiceShortDesc || "";
            this.ServiceName = ServiceMaster.ServiceName || "";
            this.Price = ServiceMaster.Price || "";
            this.IsEditable = ServiceMaster.IsEditable || 0;
            this.CreditedtoDoctor = ServiceMaster.CreditedtoDoctor || 0;
            this.EffectiveDate = ServiceMaster.EffectiveDate || this.currentDate;
            this.IsPathology = ServiceMaster.IsPathology || 0;
            this.IsRadiology = ServiceMaster.IsRadiology || 0;
            this.IsDeleted = ServiceMaster.IsDeleted || 0;
            this.PrintOrder = ServiceMaster.PrintOrder || "";
            this.IsPackage = ServiceMaster.IsPackage || 0;
            this.SubGroupId = ServiceMaster.SubGroupId || "";
            this.DoctorId = ServiceMaster.DoctorId || "";
            this.IsEmergency = ServiceMaster.IsEmergency || 0;
            this.EmgAmt = ServiceMaster.EmgAmt || "";
            this.EmgPer = ServiceMaster.EmgPer || "";
            this.IsDocEditable = ServiceMaster.DoctorId || 0;
            this.AddedBy = ServiceMaster.AddedBy || "";
            this.UpdatedBy = ServiceMaster.UpdatedBy || "";
            this.AddedByName = ServiceMaster.AddedByName || "";
        }
    }
}

export class Servicedetail {
    ServiceDetailId: number;
    ServiceId: number;
    TariffId: number;
    ClassId: number;
    ClassName:any;
    ClassRate: any;
    EffectiveDate: Date;
    currentDate = new Date();
    constructor(Servicedetail) {
        {
            this.ServiceDetailId = Servicedetail.ServiceDetailId || "";
            this.ServiceId = Servicedetail.ServiceId || "";
            this.TariffId = Servicedetail.TariffId || "";
            this.ClassId = Servicedetail.ClassId || "";
            this.ClassName = Servicedetail.ClassName || "";
            this.ClassRate = Servicedetail.ClassRate || 0;
            this.EffectiveDate = Servicedetail.EffectiveDate || this.currentDate;
    }
}
}