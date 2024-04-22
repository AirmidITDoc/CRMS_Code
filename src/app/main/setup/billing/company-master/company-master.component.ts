import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { CompanyMasterService } from "./company-master.service";
import { ReplaySubject, Subject } from "rxjs";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import { CompanyMasterListComponent } from "./company-master-list/company-master-list.component";
import Swal from "sweetalert2";

@Component({
    selector: "app-company-master",
    templateUrl: "./company-master.component.html",
    styleUrls: ["./company-master.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CompanyMasterComponent implements OnInit {
    //RadiologytemplateMasterList: any;
    isLoading = true;
    msg: any;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = [
        "CompanyId",
        "CompanyName",
        "Address",
        "ContactNo",
        "PinCode",
        "State",
        "StateCode",
        "GSTIN",
        "SAC",
        "PAN",
        "PlaceOfSupply",
        "action"
    ];

    datasource = new MatTableDataSource<CompanyMaster>();

    //doctorone filter
    public doctortwoFilterCtrl: FormControl = new FormControl();
    public filteredDoctortwo: ReplaySubject<any> = new ReplaySubject<any>(1);

    private _onDestroy = new Subject<void>();

    constructor(
        public _companyService: CompanyMasterService,

        public _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getCompanyMaster();
    }
    // onSearch() {
    //     this.getCompanyMaster();
    // }

    onSearchClear() {
        this._companyService.myformSearch.reset({
            CompanyNameSearch: "",
            IsDeletedSearch: "0",
        });
    }
    getCompanyMaster() {
        var param = { CompanyName: this._companyService.myformSearch.get('CompanyNameSearch').value + '%' || "%" };
        this._companyService.getCompanyMaster(param).subscribe(
            (Menu) => {
                this.datasource.data = Menu as CompanyMaster[];
                console.log(this.datasource.data);
                this.isLoading = false;
                this.datasource.sort = this.sort;
                this.datasource.paginator = this.paginator;
            },
            (error) => (this.isLoading = false)
        );
    }

    onClear() {
        this._companyService.myform.reset({ IsDeleted: "false" });
        this._companyService.initializeFormGroup();
    }
    
  deleteTableRow(element) {
    let Query = "Update  M_CompanyDetails set IsActive=0 where  CompanyId=" + element.CompanyId + " ";
    console.log(Query)
      this._companyService.getdeletemember(Query).subscribe(data => {
       if(data)
       Swal.fire('Success !', 'List Row is Deactivate Successfully', 'success');

      });
  }
    onEdit(row) {
        debugger;
       
        var m_data = {
            CompanyId: row.CompanyId,
            CompTypeId: row.CompTypeId,
            CompanyName: row.CompanyName,
            Address: row.Address,
            ContactNo:row.ContactNo,
            PinCode:row.PinCode,
            State: row.State,
            StateCode: row.StateCode,
            GSTIN:row.GSTIN,
            SAC:row.SAC,
            PAN: row.PAN,
            PlaceOfSupply:row.PlaceOfSupply,
        };
console.log(m_data);
        this._companyService.populateForm(m_data);

        const dialogRef = this._matDialog.open(CompanyMasterListComponent, {
            maxWidth: "80vw",
            maxHeight: "55vh",
            width: "100%",
            height: "100%",
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed - Insert Action", result);
            this.getCompanyMaster();
        });
    }

    onAdd() {
        const dialogRef = this._matDialog.open(CompanyMasterListComponent, {
            maxWidth: "80vw",
            maxHeight: "62vh",
            width: "100%",
            height: "100%",
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed - Insert Action", result);
            this.getCompanyMaster();
        });
    }
}
export class CompanyMaster {
    CompanyId: number;
    CompTypeId: number;
    CompanyName: string;
    Address: string;
    ContactNo: any;
    PinCode:  any;
    State:  any;;
    StateCode:  any;
    GSTIN:  any;
    SAC:  any;
    PAN:  any;
    PlaceOfSupply: any;
       
    /**
   * Constructor
   *
export class CompanyMaster {
   * @param export class CompanyMaster {

   */
    constructor(CompanyMaster) {
        {
            this.CompanyId = CompanyMaster.CompanyId || "";
            this.CompTypeId = CompanyMaster.CompTypeId || "";
            this.CompanyName = CompanyMaster.CompanyName || "";
            this.Address = CompanyMaster.Address || "";
            this.ContactNo = CompanyMaster.ContactNo || "";
            this.PinCode = CompanyMaster.PinCode || "";
            this.State = CompanyMaster.State || "";
            this.StateCode = CompanyMaster.StateCode || "";
            this.GSTIN = CompanyMaster.GSTIN || "";
            this.SAC = CompanyMaster.SAC || "";
            this.PAN = CompanyMaster.PAN || "";
            this.PlaceOfSupply = CompanyMaster.PlaceOfSupply || "";
            
           
        }
    }
}
