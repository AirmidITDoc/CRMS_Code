import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { ReplaySubject, Subject } from 'rxjs';
import { DoctorMasterService } from '../doctor-master.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import Swal from 'sweetalert2';
import { DoctorDepartmentDet, DoctorMaster } from '../doctor-master.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-new-doctor',
    templateUrl: './new-doctor.component.html',
    styleUrls: ['./new-doctor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NewDoctorComponent implements OnInit {

    submitted = false;
    data1: [];
    isLoading: any;
    PrefixcmbList: any = [];
    GendercmbList: any = [];
    DoctortypecmbList: any = [];
    DepartmentcmbList: any = [];
    selectedGenderID: any;
    registerObj: DoctorMaster;
    docobject: DoctorDepartmentDet;
    msg: any;
    b_AgeYear:any=0;
    b_AgeMonth:any=0;
    b_AgeDay:any=0;


    deptlist: any = [];

    displayedColumns = [

        'DeptId',
        'DeptName'
    ];

    public departmentFilterCtrl: FormControl = new FormControl();
    public filteredDepartment: ReplaySubject<any> = new ReplaySubject<any>(1);

    public prefixFilterCtrl: FormControl = new FormControl();
    public filteredPrefix: ReplaySubject<any> = new ReplaySubject<any>(1);

    public doctortypeFilterCtrl: FormControl = new FormControl();
    public filteredDoctortype: ReplaySubject<any> = new ReplaySubject<any>(1);

    private _onDestroy = new Subject<void>();

    DeptSource = new MatTableDataSource<ChargesList>();

    dataSource = new MatTableDataSource<ChargesList>();
    constructor(
        public _doctorService: DoctorMasterService,
        private accountService: AuthenticationService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<NewDoctorComponent>
    ) { }

    ngOnInit(): void {
   
        if (this.data) {
            this.registerObj = this.data.registerObj;
        }
        else{
            this._doctorService.myform.reset();
        }

        this.getPrefixNameCombobox();
        this.getGenderNameCombobox();
        this.getDoctortypeNameCombobox();
        this.getDepartmentNameCombobox();

        this.prefixFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterPrefix();
            });

        this.departmentFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterDepartment();
            });

        this.doctortypeFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterDoctortype();
            });

       
    }

    // validation
    get f() {
        return this._doctorService.myform.controls;
    }


    setDropdownObjs1() {
        debugger;

        debugger;
        const toSelect = this.PrefixcmbList.find(c => c.PrefixID == this.registerObj.PrefixID);
        this._doctorService.myform.get('PrefixID').setValue(toSelect);

        const toSelect1 = this.DepartmentcmbList.find(c => c.Departmentid == this.docobject.DepartmentId);
        this._doctorService.myform.get('Departmentid').setValue(toSelect1);

        // const toSelectReligion = this.ReligionList.find(c => c.ReligionId == this.registerObj.ReligionId);
        // this._doctorService.myform.get('ReligionId').setValue(toSelectReligion);

        // const toSelectArea = this.AreaList.find(c => c.AreaId == this.registerObj.AreaId);
        // this._doctorService.myform.get('AreaId').setValue(toSelectArea);

        // const toSelectCity = this.cityList.find(c => c.CityId == this.registerObj.CityId);
        // this._doctorService.myform.get('CityId').setValue(toSelectCity);

        // const toSelectMat = this.cityList.find(c => c.CityId == this.registerObj.CityId);
        // this._doctorService.myform.get('CityId').setValue(toSelectCity);


        // this.onChangeGenderList(this._doctorService.myform.get('PrefixID').value);

        // this.onChangeCityList(this.registerObj.CityId);

        this._doctorService.myform.updateValueAndValidity();
        // this.dialogRef.close();

    }


    private filterPrefix() {
        if (!this.PrefixcmbList) {
            return;
        }
        // get the search keyword
        let search = this.prefixFilterCtrl.value;
        if (!search) {
            this.filteredPrefix.next(this.PrefixcmbList.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredPrefix.next(
            this.PrefixcmbList.filter(
                (bank) => bank.PrefixName.toLowerCase().indexOf(search) > -1
            )
        );
    }

    private filterDepartment() {
        // debugger;
        if (!this.DepartmentcmbList) {
            return;
        }
        // get the search keyword
        let search = this.departmentFilterCtrl.value;
        if (!search) {
            this.filteredDepartment.next(this.DepartmentcmbList.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter
        this.filteredDepartment.next(
            this.DepartmentcmbList.filter(
                (bank) => bank.DepartmentName.toLowerCase().indexOf(search) > -1
            )
        );
    }

    private filterDoctortype() {
        // debugger;
        if (!this.DoctortypecmbList) {
            return;
        }
        // get the search keyword
        let search = this.doctortypeFilterCtrl.value;
        if (!search) {
            this.filteredDoctortype.next(this.DoctortypecmbList.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter
        this.filteredDoctortype.next(
            this.DoctortypecmbList.filter(
                (bank) => bank.DoctorType.toLowerCase().indexOf(search) > -1
            )
        );
    }
    getPrefixNameCombobox() {
        debugger
        this._doctorService.getPrefixMasterCombo().subscribe((data) => {
            this.PrefixcmbList = data;
            this.filteredPrefix.next(this.PrefixcmbList.slice());
            const ddValue = this.PrefixcmbList.find(c => c.PrefixID == this.data.registerObj.PrefixID);
            this._doctorService.myform.get('PrefixID').setValue(ddValue);  
            this.onChangeGenderList(ddValue);  
        });

        // debugger
        // this.onChangeGenderList(this._doctorService.myform.get('PrefixID').value.PrefixID);  
    }

    getGenderNameCombobox() {
        this._doctorService.getGenderMasterCombo().subscribe((data) => (this.GendercmbList = data));
    }

    getDoctortypeNameCombobox() {
        // this._doctorService.getDoctortypeMasterCombo().subscribe(data =>this.DoctortypecmbList =data);
        this._doctorService.getDoctortypeMasterCombo().subscribe((data) => {
            this.DoctortypecmbList = data;
            this.filteredDoctortype.next(this.DoctortypecmbList.slice());
            this._doctorService.myform
                .get("DoctorTypeId")
                .setValue(this.DoctortypecmbList[0]);
        });
    }

    getDepartmentNameCombobox() {
        // this._doctorService.getDepartmentCombobox().subscribe(data =>this.DepartmentcmbList =data);

        this._doctorService.getDepartmentCombobox().subscribe((data) => {
            this.DepartmentcmbList = data;
            console.log(data);
            this.filteredDepartment.next(this.DepartmentcmbList.slice());
            this._doctorService.myform
                .get("Departmentid")
                .setValue(this.DepartmentcmbList[0]);
        });
    }

    onSubmit() {

        debugger;
        if (this._doctorService.myform.valid) {
            if (!this._doctorService.myform.get("DoctorId").value) {
                var data2 = [];
                // for (var val of this._doctorService.myform.get("Departmentid")
                //     .value.Departmentid) {
                var data = {
                    DepartmentId: this._doctorService.myform.get("Departmentid").value.Departmentid,
                    DoctorId: 0,
                };
                data2.push(data);
                // }
                console.log(data2);
                var m_data = {
                    insertDoctorMaster: {
                        doctorId:
                            "0" ||
                            this._doctorService.myform.get("DoctorId").value,
                        prefixID:
                            this._doctorService.myform.get("PrefixID").value
                                .PrefixID,
                        firstName:
                            this._doctorService.myform
                                .get("FirstName")
                                .value.trim() || "%",
                        middleName: this._doctorService.myform
                            .get("MiddleName")
                            .value || "%",
                        lastName:
                            this._doctorService.myform
                                .get("LastName")
                                .value.trim() || "%",
                        dateOfBirth: this._doctorService.myform.get("DateofBirth").value || '01/0/1900',
                        address:
                            this._doctorService.myform
                                .get("Address")
                                .value.trim() || "%",
                        city:
                            this._doctorService.myform
                                .get("City")
                                .value || "%",
                        pin:
                            this._doctorService.myform
                                .get("Pin")
                                .value || "0",
                        phone:
                            this._doctorService.myform
                                .get("Phone")
                                .value|| "0",
                        mobile: this._doctorService.myform
                            .get("Mobile")
                            .value || "%",
                        genderId:
                            this._doctorService.myform.get("GenderId").value.GenderId || 0,
                        education:
                            this._doctorService.myform
                                .get("Education")
                                .value.trim() || "%",
                        isConsultant: Boolean(
                            JSON.parse(
                                this._doctorService.myform.get("IsConsultant")
                                    .value
                            )
                        ),
                        isRefDoc: Boolean(
                            JSON.parse(
                                this._doctorService.myform.get("IsRefDoc").value
                            )
                        ),
                        IsActive: Boolean(
                            JSON.parse(
                                this._doctorService.myform.get("IsDeleted")
                                    .value
                            )
                        ),
                        doctorTypeId: 0, //his._doctorService.myform.get("DoctorTypeId")                 .value,
                        ageYear:
                            this._doctorService.myform
                                .get("AgeYear")
                                .value || "0",
                        ageMonth:
                            this._doctorService.myform
                                .get("AgeMonth")
                                .value || "0",
                        ageDay:
                            this._doctorService.myform
                                .get("AgeDay")
                                .value || "0",
                        passportNo:
                            this._doctorService.myform
                                .get("PassportNo")
                                .value || "0",
                        esino:
                            this._doctorService.myform
                                .get("ESINO")
                                .value || "0",
                        regNo:
                            this._doctorService.myform
                                .get("RegNo")
                                .value || "0",
                        regDate:
                            this._doctorService.myform.get("RegDate").value ||
                            "01/01/1900",
                        mahRegNo:
                            this._doctorService.myform.get("MahRegNo").value ||
                            "0",
                        mahRegDate:
                            this._doctorService.myform.get("MahRegDate")
                                .value || "01/01/1900",
                        addedBy: this.accountService.currentUserValue.user.id,
                        RefDocHospitalName:
                            this._doctorService.myform
                                .get("RefDocHospitalName")
                                .value|| "%",
                    },
                    assignDoctorDepartmentDet: data2,
                };
                console.log(m_data);
                debugger
                this._doctorService
                    .doctortMasterInsert(m_data)
                    .subscribe((data) => {
                        // this.msg = data;
                        if (data) {
                            Swal.fire(
                                "Saved !",
                                "Record saved Successfully !",
                                "success"
                            ).then((result) => {
                                if (result.isConfirmed) {
                                }
                            });
                        } else {
                            Swal.fire(
                                "Error !",
                                "Doctor not saved",
                                "error"
                            );
                        }
                    });

                // this.notification.success("Record added successfully");
            } else {
                var data3 = [];
               
                this.dataSource.data.forEach((element) => {
                    let DocInsertObj = {};
                    DocInsertObj['DepartmentId'] = element.DeptId;
                    DocInsertObj['DoctorId'] = this._doctorService.myform.get("DoctorId").value;
                    data3.push(DocInsertObj);
                  });


                var m_dataUpdate = {
                    updateDoctorMaster: {
                        DoctorId:
                            this._doctorService.myform.get("DoctorId").value ||
                            "0",
                        PrefixID:
                            this._doctorService.myform.get("PrefixID").value.PrefixID,
                        FirstName: this._doctorService.myform
                            .get("FirstName")
                            .value.trim() || "%",
                        MiddleName:
                            this._doctorService.myform
                                .get("MiddleName")
                                .value || "%",
                        LastName: this._doctorService.myform
                            .get("LastName")
                            .value.trim() || "%",
                        DateofBirth:
                            this._doctorService.myform.get("DateofBirth").value,
                        Address:
                            this._doctorService.myform
                                .get("Address")
                                .value.trim() || "%",
                        City:
                            this._doctorService.myform
                                .get("City")
                                .value.trim() || "%",
                        Pin:
                            this._doctorService.myform
                                .get("Pin")
                                .value || "0",
                        Phone:
                            this._doctorService.myform
                                .get("Phone")
                                .value || "0",
                        Mobile: this._doctorService.myform
                            .get("Mobile")
                            .value.trim(),
                        GenderId:
                            this._doctorService.myform.get("GenderId").value.GenderId || 0,
                        Education:
                            this._doctorService.myform
                                .get("Education")
                                .value.trim() || "%",
                        IsConsultant: Boolean(
                            JSON.parse(
                                this._doctorService.myform.get("IsConsultant")
                                    .value
                            )
                        ),
                        IsRefDoc: Boolean(
                            JSON.parse(
                                this._doctorService.myform.get("IsRefDoc").value
                            )
                        ),
                        IsDeleted: Boolean(
                            JSON.parse(
                                this._doctorService.myform.get("IsDeleted")
                                    .value
                            )
                        ),
                        DoctorTypeId: 0,
                        // this._doctorService.myform.get("DoctorTypeId")
                        //     .value,
                        AgeYear:
                            this._doctorService.myform
                                .get("AgeYear")
                                .value || "0",
                        AgeMonth:
                            this._doctorService.myform
                                .get("AgeMonth")
                                .value || "0",
                        AgeDay: this._doctorService.myform
                            .get("AgeDay")
                            .value || "0",
                        PassportNo:
                            this._doctorService.myform
                                .get("PassportNo")
                                .value || "0",
                        ESINO:
                            this._doctorService.myform
                                .get("ESINO")
                                .value || "0",
                        RegNo:
                            this._doctorService.myform
                                .get("RegNo")
                                .value || "0",
                        RegDate:
                            this._doctorService.myform.get("RegDate").value ||
                            "01/01/1900", //"01/01/2018",
                        MahRegNo:
                            this._doctorService.myform.get("MahRegNo").value ||
                            "0",
                        MahRegDate:
                            this._doctorService.myform.get("MahRegDate")
                                .value || "01/01/1900", //"01/01/2018",
                        RefDocHospitalName:
                            this._doctorService.myform
                                .get("RefDocHospitalName")
                                .value || "%",
                        UpdatedBy: this.accountService.currentUserValue.user.id,
                    },
                    deleteAssignDoctorToDepartment: {
                        DoctorId:
                            this._doctorService.myform.get("DoctorId").value,
                    },
                    assignDoctorDepartmentDet: data3,
                };

                console.log(m_dataUpdate);
                this._doctorService
                    .doctortMasterUpdate(m_dataUpdate)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            Swal.fire(
                                "Updated !",
                                "Record updated Successfully !",
                                "success"
                            ).then((result) => {
                                if (result.isConfirmed) {
                                }
                            });
                        } else {
                            Swal.fire(
                                "Error !",
                                "Appoinment not updated",
                                "error"
                            );
                        }
                    });

                // this.notification.success("Record updated successfully");
            }
            this.onClose();
        }
    }
    
    onClear() {
        this._doctorService.myform.reset();
    }
    onClose() {
        this._doctorService.myform.reset();
        this.dialogRef.close();
    }

    onChangeDateofBirth(DateOfBirth) {
        if (DateOfBirth) {
          const todayDate = new Date();
          const dob = new Date(DateOfBirth);
          const timeDiff = Math.abs(Date.now() - dob.getTime());
          this.b_AgeYear = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
          this.b_AgeMonth = Math.abs(todayDate.getMonth() - dob.getMonth());
          this.b_AgeDay = Math.abs(todayDate.getDate() - dob.getDate());
        //   this.registerObj.DateofBirth = DateOfBirth;
        //   this._doctorService.myform.get('DateOfBirth').setValue(DateOfBirth);
        }
    
      }

    onChangeGenderList(prefixObj) {
        debugger
        if (prefixObj) {
            this._doctorService
                .getGenderCombo(prefixObj.PrefixID)
                .subscribe((data) => {
                    this.GendercmbList = data;
                    this._doctorService.myform.get("GenderId").setValue(this.GendercmbList[0]);
                    // this.selectedGender = this.GenderList[0];
                    this.selectedGenderID = this.GendercmbList[0].GenderId;
                });
        }
    }

    SaveEnter(element) {
        debugger
        this.isLoading = 'save';
        this.dataSource.data = [];
        this.deptlist.push(
            {
                DeptId: element.Departmentid,
                DeptName: element.departmentName,

            });
        this.dataSource.data = this.deptlist;
        console.log(this.deptlist);
    }
}


export class ChargesList {
    DeptId: number;
    DeptName: number;


    constructor(ChargesList) {
        this.DeptId = ChargesList.DeptId || '';
        this.DeptName = ChargesList.DeptName || '';
    }
}