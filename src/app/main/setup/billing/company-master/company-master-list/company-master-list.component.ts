import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { CompanyMasterService } from "../company-master.service";
import { CompanyMaster, CompanyMasterComponent } from "../company-master.component";
import { MatDialogRef } from "@angular/material/dialog";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AuthenticationService } from "app/core/services/authentication.service";

@Component({
    selector: "app-company-master-list",
    templateUrl: "./company-master-list.component.html",
    styleUrls: ["./company-master-list.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CompanyMasterListComponent implements OnInit {
    submitted = false;
   
    msg: any;
    dataArray = {};
    isLoading = true;
    stateList: any = [];
    selectedState:any;
    registerObj:CompanyMaster;

    StateCode:any;

    private _onDestroy = new Subject<void>();

    constructor(
        public _companyService: CompanyMasterService,
        private accountService: AuthenticationService,
        public dialogRef: MatDialogRef<CompanyMasterComponent>
    ) { }

    ngOnInit(): void {
     this.getStateList();
    }

    get f() {
        return this._companyService.myform.controls;
    }


    onChangeStateList(CityId) {
        // if (CityId > 0) {
        //   this._opappointmentService.getStateList(CityId).subscribe(data => {
        //     this.stateList = data;
        //     this.selectedState = this.stateList[0].StateName;
        //     //  this._AdmissionService.myFilterform.get('StateId').setValue(this.selectedState);
        //   });
        // }
      }
    
      getStateList() {
       
        this._companyService.getStateList().subscribe(data => {
          this.stateList = data;
          this.selectedState = this.stateList[0].StateName;
          
        });
      
    }

onChangeCountryList(event){
this.StateCode=event.StateId;
    }

    getCompanyMaster() {
        var data = {
            compTypeId: this._companyService.myform.get("CompTypeId").value,
            companyName: this._companyService.myform.get("CompanyName").value,
            address: this._companyService.myform.get("Address").value,
            city: this._companyService.myform.get("City").value,
            pinNo: this._companyService.myform.get("PinNo").value,
            phoneNo: this._companyService.myform.get("PhoneNo").value,
            mobileNo: this._companyService.myform.get("MobileNo").value,
            faxNo: this._companyService.myform.get("FaxNo").value,
            tariffId: this._companyService.myform.get("TariffId").value,
            isDeleted: Boolean(
                JSON.parse(this._companyService.myform.get("IsDeleted").value)
            ),
            addedBy: 10,
            updatedBy: 0,
            isCancelled: false,
            isCancelledBy: 0,
            isCancelledDate: "01/01/1900",
        };
        this._companyService.getCompanyMaster(data).subscribe(
            (Menu) => {
                this.dataArray = Menu;
            },
            (error) => (this.isLoading = false)
        );
    }

    onSubmit() {
        if (this._companyService.myform.valid) {
            if (!this._companyService.myform.get("CompanyId").value) {
                var m_data = {
                    companyMasterInsert: {
                        compTypeId:
                            this._companyService.myform.get("CompTypeId").value
                                .CompanyTypeId,
                        companyName: this._companyService.myform
                            .get("CompanyName")
                            .value.trim(),
                        address: this._companyService.myform
                            .get("Address")
                            .value.trim(),
                        ContactNo: this._companyService.myform
                            .get("ContactNo")
                            .value.trim(),
                        PinCode: this._companyService.myform
                            .get("PinCode")
                            .value.trim(),
                        State: this._companyService.myform
                            .get("State")
                            .value.trim(),
                        StateCode: this._companyService.myform
                            .get("StateCode")
                            .value.trim(),
                        GSTIN: this._companyService.myform
                            .get("GSTIN")
                            .value.trim(),
                        SAC:
                            this._companyService.myform.get("SAC").value
                        ,
                        PAN:
                            this._companyService.myform.get("PAN").value
                        ,
                        PlaceOfSupply:  this._companyService.myform.get("PlaceOfSupply").value,
                        CreatedBy:this.accountService.currentUserValue.user.id
                     
                    },
                };
                console.log(m_data);
                this._companyService
                    .companyMasterInsert(m_data)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            Swal.fire(
                                "Saved !",
                                "Record saved Successfully !",
                                "success"
                            ).then((result) => {
                                if (result.isConfirmed) {
                                    // this.getCompanyMaster();
                                }
                            });
                        } else {
                            Swal.fire(
                                "Error !",
                                "Company Data not saved",
                                "error"
                            );
                        }
                        // this.getCompanyMaster();
                    });
            } else {
                var m_dataUpdate = {
                    companyMasterUpdate: {
                        compTypeId:
                        this._companyService.myform.get("CompTypeId").value
                            .CompanyTypeId,
                    companyName: this._companyService.myform
                        .get("CompanyName")
                        .value.trim(),
                    address: this._companyService.myform
                        .get("Address")
                        .value.trim(),
                    ContactNo: this._companyService.myform
                        .get("ContactNo")
                        .value.trim(),
                    PinCode: this._companyService.myform
                        .get("PinCode")
                        .value.trim(),
                    State: this._companyService.myform
                        .get("State")
                        .value.trim(),
                    StateCode: this._companyService.myform
                        .get("StateCode")
                        .value.trim(),
                    GSTIN: this._companyService.myform
                        .get("GSTIN")
                        .value.trim(),
                    SAC:
                        this._companyService.myform.get("SAC").value
                    ,
                    PAN:
                        this._companyService.myform.get("PAN").value
                    ,
                    PlaceOfSupply:  this._companyService.myform.get("PlaceOfSupply").value,
                    updatedBy: this.accountService.currentUserValue.user.id,
                    isActive:1
                    },
                };

                this._companyService
                    .companyMasterUpdate(m_dataUpdate)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            Swal.fire(
                                "Updated !",
                                "Record updated Successfully !",
                                "success"
                            ).then((result) => {
                                if (result.isConfirmed) {
                                    //  this.getCompanyMaster();
                                }
                            });
                        } else {
                            Swal.fire(
                                "Error !",
                                "Appoinment not updated",
                                "error"
                            );
                        }
                        //  this.getCompanyMaster();
                    });
            }
            this.onClose();
        }
    }
    // onEdit(row) {
    //     var m_data = {
    //         CompanyId: row.CompanyId,
    //         CompTypeId: row.CompTypeId,
    //         CompanyName: row.CompanyName.trim(),
    //         Address: row.Address.trim(),
    //         City: row.City.trim(),
    //         PinNo: row.PinNo.trim(),
    //         PhoneNo: row.PhoneNo.trim(),
    //         MobileNo: row.MobileNo.trim(),
    //         FaxNo: row.FaxNo.trim(),
    //         TariffId: row.TariffId,
    //         IsDeleted: JSON.stringify(row.IsDeleted),
    //         UpdatedBy: row.UpdatedBy,
    //         IsCancelled: JSON.stringify(row.IsCancelled),
    //         IsCancelledBy: row.IsCancelledBy,
    //         IsCancelledDate: row.IsCancelledDate,
    //     };
    //     this._companyService.populateForm(m_data);
    // }

    onClear() {
        this._companyService.myform.reset();
    }
    onClose() {
        this._companyService.myform.reset();
        this.dialogRef.close();
    }
}
