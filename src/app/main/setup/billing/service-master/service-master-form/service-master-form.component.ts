import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ServiceMaster, ServiceMasterComponent, Servicedetail } from "../service-master.component";
import { fuseAnimations } from "@fuse/animations";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl, Validators } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ServiceMasterService } from "../service-master.service";
import { MatPaginator } from "@angular/material/paginator";
import { takeUntil } from "rxjs/operators";
import { MatSort } from "@angular/material/sort";
import { element } from "protractor";
import { DatePipe } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: "app-service-master-form",
  templateUrl: "./service-master-form.component.html",
  styleUrls: ["./service-master-form.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class ServiceMasterFormComponent implements OnInit {
  submitted = false;
  registerObj = new ServiceMaster({});
  GroupcmbList: any = [];
  DoctorcmbList: any = [];
  SubGroupcmbList: any = [];
  ClasscmbList: any = [];
  TariffcmbList: any = [];
  Today = new Date();
  butDisabled: boolean = false;
  butDisabled1: boolean = true;
  doctorNameCmbList: any = [];
  ServiceId: any = 0;
  IsDoctor: boolean = true;
  IsEmergency: boolean = true;
  interimArray: any = [];
  msg: any;
  ClassRate: any;
  screenFromString = 'OP-billing';
  IsEditable: any;
  IsActive: any;
  CreditedtoDoctor: any;
  IsDocEditable: any;
  // CreditedtoDoctor:any;


  dataSource = new MatTableDataSource<Servicedetail>();
  dataSource1 = new MatTableDataSource<Servicedetail>();

  //tariff filter
  public tariffFilterCtrl: FormControl = new FormControl();
  public filteredTariff: ReplaySubject<any> = new ReplaySubject<any>(1);


  //groupname filter
  public groupnameFilterCtrl: FormControl = new FormControl();
  public filteredGroupname: ReplaySubject<any> = new ReplaySubject<any>(1);

  //subgroupname filter
  public subgroupnameFilterCtrl: FormControl = new FormControl();
  public filteredSubgroupname: ReplaySubject<any> = new ReplaySubject<any>(1);


  //doctorone filter
  public doctorFilterCtrl: FormControl = new FormControl();
  public filteredDoctor: ReplaySubject<any> = new ReplaySubject<any>(1);


  private _onDestroy = new Subject<void>();

  constructor(public _serviceMasterService: ServiceMasterService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    // public datePipe: DatePipe,
    public dialogRef: MatDialogRef<ServiceMasterComponent>,
  ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = [
    // 'checkbox',
    // 'ClassId',
    'ClassName',
    'ClassRate',
    'ChangeClassRate'

  ];

  ngOnInit(): void {
    debugger;


    if (this.data) {
      this.registerObj = this.data.registerObj;
      console.log(this.registerObj);

      if(this.registerObj.IsEmergency=="true")
      {
        this._serviceMasterService.myform.get('IsEmergency').setValue(1);
      }else{
        this._serviceMasterService.myform.get('IsEmergency').setValue(0);
      }

      if(this.registerObj.IsDocEditable=="true")
      {
        this._serviceMasterService.myform.get('IsDocEditable').setValue(1);
      }else{
        this._serviceMasterService.myform.get('IsDocEditable').setValue(0);
      }


      if(this.registerObj.IsEditable=="true")
      {
        this._serviceMasterService.myform.get('IsEditable').setValue(1);
      }else{
        this._serviceMasterService.myform.get('IsEditable').setValue(0);
      }


      if(this.registerObj.CreditedtoDoctor=="true")
      {
        this._serviceMasterService.myform.get('CreditedtoDoctor').setValue(1);
      }else{
        this._serviceMasterService.myform.get('CreditedtoDoctor').setValue(0);
      }

      if(this.registerObj.IsActive=="true")
      {
        this._serviceMasterService.myform.get('IsActive').setValue(1);
      }else{
        this._serviceMasterService.myform.get('IsActive').setValue(0);
      }
      if(this.registerObj.IsPathology=="true")
      {
        this._serviceMasterService.myform.get('IsPathology').setValue(1);
      }else{
        this._serviceMasterService.myform.get('IsPathology').setValue(0);
      }

      if(this.registerObj.IsRadiology=="true")
      {
        this._serviceMasterService.myform.get('IsRadiology').setValue(1);
      }else{
        this._serviceMasterService.myform.get('IsRadiology').setValue(0);
      }




      if (this.data.IsSubmitFlag == true) {
        /////chk....
        // this.butDisabled = true
        // this.butDisabled1 = false
        this.ServiceId = this.data.ServiceId;

      }
      this.getClassListforUpdate();
    } else {
      this._serviceMasterService.myform.reset();
      this.getClassListforNew();
    }


    this.getAdmittedDoctorCombo();
    this.getGroupNameCombobox();
    this.getDoctorNameCombobox();
    //  this.getSubgroupNameCombobox();

    this.getTariffNameCombobox();



    this.groupnameFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterGroupname();
      });


    this.subgroupnameFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSubgroupname();
      });

    this.tariffFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterTariff();

      });

  }


  private filterGroupname() {
    // debugger;
    if (!this.GroupcmbList) {
      return;
    }
    // get the search keyword
    let search = this.groupnameFilterCtrl.value;
    if (!search) {
      this.filteredGroupname.next(this.GroupcmbList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredGroupname.next(
      this.GroupcmbList.filter(bank => bank.GroupName.toLowerCase().indexOf(search) > -1)
    );
  }


  private filterSubgroupname() {
    // debugger;
    if (!this.SubGroupcmbList) {
      return;
    }
    // get the search keyword
    let search = this.subgroupnameFilterCtrl.value;
    if (!search) {
      this.filteredSubgroupname.next(this.SubGroupcmbList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredSubgroupname.next(
      this.SubGroupcmbList.filter(bank => bank.SubGroupName.toLowerCase().indexOf(search) > -1)
    );
  }


  // doctorone filter code  
  private filterDoctor() {

    if (!this.doctorNameCmbList) {
      return;
    }
    // get the search keyword
    let search = this.doctorFilterCtrl.value;
    if (!search) {
      this.filteredDoctor.next(this.doctorNameCmbList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredDoctor.next(
      this.doctorNameCmbList.filter(bank => bank.DoctorName.toLowerCase().indexOf(search) > -1)
    );
  }


  private filterTariff() {

    if (!this.TariffcmbList) {
      return;
    }
    // get the search keyword
    let search = this.tariffFilterCtrl.value;
    if (!search) {
      this.filteredTariff.next(this.TariffcmbList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredTariff.next(
      this.TariffcmbList.filter(bank => bank.TariffName.toLowerCase().indexOf(search) > -1)
    );
  }


  tableElementChecked(event, element) {
    debugger;
    if (event.checked) {
      this.interimArray.push(element);
      this.dataSource1.data = this.interimArray;


      //  let netAmt = this.Fianlamt + this.dataSource1.data[0].TotalBillAmt;
      //   this.TaxableAmount = netAmt;
      //   this.Fianlamt = netAmt;
      // let total = Math.round(parseInt(this.TaxableAmount) * parseInt(this.CGST)).toString();


    } else if (this.interimArray.length > 0) {
      let index = this.interimArray.indexOf(element);
      if (index !== -1) {
        this.interimArray.splice(index, 1);
      }
    }

    console.log(this.dataSource1.data);
  }


  getAdmittedDoctorCombo() {

    this._serviceMasterService.getAdmittedDoctorCombo().subscribe(data => {
      this.doctorNameCmbList = data;
      console.log(this.doctorNameCmbList);
      this.filteredDoctor.next(this.doctorNameCmbList.slice());
    })


  }

  getClassListforUpdate() {
    var m = {
      ServiceId: 1,
      TariffId: 1,
    };
    this._serviceMasterService.getServiceClassMasterUpdateList(m).subscribe(Menu => {
      this.dataSource.data = Menu as Servicedetail[];
      console.log(this.dataSource.data)
    })
  }


  getClassListforNew() {
    debugger
    this._serviceMasterService.getServiceClassMasterList().subscribe(Menu => {
      this.dataSource.data = Menu as Servicedetail[];
      console.log(this.dataSource.data)
    })
  }

  get f() { return this._serviceMasterService.myform.controls; }

  getGroupNameCombobox() {
    // this._serviceService.getGroupMasterCombo().subscribe(data =>this.GroupcmbList =data);

    this._serviceMasterService.getGroupMasterCombo().subscribe(data => {
      this.GroupcmbList = data;
      this.filteredGroupname.next(this.GroupcmbList.slice());
      this._serviceMasterService.myform.get('GroupId').setValue(this.GroupcmbList[0]);
    });
  }

  getDoctorNameCombobox() {
    this._serviceMasterService.getDoctorMasterCombo().subscribe(data => this.DoctorcmbList = data);

  }

  // getSubgroupNameCombobox(){
  //   // this._serviceService.getSubgroupMasterCombo().subscribe(data =>this.SubGroupcmbList =data);

  //   this._serviceMasterService.getSubgroupMasterCombo().subscribe(data => {
  //     this.SubGroupcmbList = data;
  //     this.filteredSubgroupname.next(this.SubGroupcmbList.slice());
  //     this._serviceMasterService.myform.get('SubGroupId').setValue(this.SubGroupcmbList[0]);
  //   });
  // }

  getTariffNameCombobox() {
    // this._serviceService.getTariffMasterCombo().subscribe(data =>this.TariffcmbList =data);
    this._serviceMasterService.getTariffMasterCombo().subscribe(data => {
      this.TariffcmbList = data;
      console.log(this.TariffcmbList)
      // this.filteredTariff.next(this.TariffcmbList.slice());
      this._serviceMasterService.myform.get('TariffId').setValue(this.TariffcmbList[0]);
    });
  }


  // getClassRate(element) {
  //   debugger;
  //   this.ClassRate = element.ClassRate;

  //   this.ClassRate = this._serviceMasterService.myform.get("ClassRate").value;
  //   console.log(this.ClassRate)
  // }

  onSubmit() {
    debugger;
    // if (this._serviceMasterService.myform.valid) {
    if (this.ServiceId == 0) {

      let serviceMasterInsert = {};
      serviceMasterInsert['groupId'] = this._serviceMasterService.myform.get("GroupId").value.GroupId || 0;
      serviceMasterInsert['ServiceShortDesc'] = this._serviceMasterService.myform.get("ServiceShortDesc").value || "";
      serviceMasterInsert['ServiceName'] = (this._serviceMasterService.myform.get("ServiceName").value).trim() || "";
      serviceMasterInsert['Price'] = this._serviceMasterService.myform.get("Price").value || "0";
      serviceMasterInsert['IsEditable'] = Boolean(JSON.parse(this._serviceMasterService.myform.get("IsEditable").value)) || 0;

      serviceMasterInsert['CreditedtoDoctor'] = Boolean(JSON.parse(this._serviceMasterService.myform.get("CreditedtoDoctor").value)) || 0;
      serviceMasterInsert['IsPathology'] = parseInt(this._serviceMasterService.myform.get("IsPathology").value) || 0;
      serviceMasterInsert['IsRadiology'] = parseInt(this._serviceMasterService.myform.get("IsRadiology").value) || 0;
      serviceMasterInsert['IsActive'] = Boolean(JSON.parse(this._serviceMasterService.myform.get("IsActive").value)) || 1;
      serviceMasterInsert['PrintOrder'] = this._serviceMasterService.myform.get("PrintOrder").value || 1;

      serviceMasterInsert['IsPackage'] = parseInt(this._serviceMasterService.myform.get("IsPackage").value) || 0;
      serviceMasterInsert['SubGroupId'] = 1;
      serviceMasterInsert['DoctorId'] = 0 ; // this._serviceMasterService.myform.get("DoctorID").value.DoctorId || 0;
      serviceMasterInsert['IsEmergency'] = 0 ; //Boolean(JSON.parse(this._serviceMasterService.myform.get("IsEmergency").value)) || 0;
      serviceMasterInsert['EmgAmt'] =  0; //this._serviceMasterService.myform.get("EmgAmt").value || 0;

      serviceMasterInsert['EmgPer'] = 0 ; //this._serviceMasterService.myform.get("EmgPer").value || 0;
      serviceMasterInsert['IsDocEditable'] = Boolean(JSON.parse(this._serviceMasterService.myform.get("IsDocEditable").value)) || 0;
      serviceMasterInsert['serviceId'] = 0;


      let serviceDetailInsertarray = [];
      let serviceDetailInsert = {};


      this.dataSource.data.forEach((element) => {
        debugger;
        console.log(element);
        let serviceDetailInsert = {};
        serviceDetailInsert['ServiceId'] = 0;
        serviceDetailInsert['TariffId'] = this._serviceMasterService.myform.get("TariffId").value.TariffId || 0;
        serviceDetailInsert['ClassId'] = element.ClassId || 0;
        serviceDetailInsert['ClassRate'] = element.ClassRate || 0;
        serviceDetailInsert['EffectiveDate'] = this._serviceMasterService.myform.get("EffectiveDate").value || "01/01/1900";

        serviceDetailInsertarray.push(serviceDetailInsert);
        // console.log(InsertAdddetArr.length);
      })

      let submitData = {
        "serviceMasterInsert": serviceMasterInsert,
        "serviceDetailInsert": serviceDetailInsertarray
      };
      console.log(submitData);
      this._serviceMasterService.serviceMasterInsert(submitData).subscribe(data => {
        if (data) {
          Swal.fire('New Service Save !', ' Service Save Successfully !', 'success').then((result) => {
            if (result.isConfirmed) {
              // this._matDialog.closeAll();
            }
          });
        } else {
          Swal.fire('Error !', 'Service not saved', 'error');
        }
      });

    }
    else {
      let serviceMasterUpdate = {};
      serviceMasterUpdate['groupId'] = this._serviceMasterService.myform.get("GroupId").value.GroupId || 0;
      serviceMasterUpdate['ServiceShortDesc'] = this._serviceMasterService.myform.get("ServiceShortDesc").value || "";
      serviceMasterUpdate['ServiceName'] = (this._serviceMasterService.myform.get("ServiceName").value).trim() || "";
      serviceMasterUpdate['Price'] = this._serviceMasterService.myform.get("Price").value || "0";
      serviceMasterUpdate['IsEditable'] = Boolean(JSON.parse(this._serviceMasterService.myform.get("IsEditable").value)) || 0;

      serviceMasterUpdate['CreditedtoDoctor'] = Boolean(JSON.parse(this._serviceMasterService.myform.get("CreditedtoDoctor").value)) || 0;
      serviceMasterUpdate['IsPathology'] = parseInt(this._serviceMasterService.myform.get("IsPathology").value) || 0;
      serviceMasterUpdate['IsRadiology'] = parseInt(this._serviceMasterService.myform.get("IsRadiology").value) || 0;
      serviceMasterUpdate['IsActive'] = 1,//Boolean(JSON.parse(this._serviceMasterService.myform.get("IsActive").value)) ||0;
        serviceMasterUpdate['PrintOrder'] = this._serviceMasterService.myform.get("PrintOrder").value || 1;

      serviceMasterUpdate['IsPackage'] = parseInt(this._serviceMasterService.myform.get("IsPackage").value) || 0;
      serviceMasterUpdate['SubGroupId'] = 1;
      serviceMasterUpdate['DoctorId'] = 0 ; //this._serviceMasterService.myform.get("DoctorID").value.DoctorId || 0;
      serviceMasterUpdate['IsEmergency'] = Boolean(JSON.parse(this._serviceMasterService.myform.get("IsEmergency").value)) || 0;
      serviceMasterUpdate['EmgAmt'] = this._serviceMasterService.myform.get("EmgAmt").value || 0;

      serviceMasterUpdate['EmgPer'] = this._serviceMasterService.myform.get("EmgPer").value || "0";
      serviceMasterUpdate['IsDocEditable'] = Boolean(JSON.parse(this._serviceMasterService.myform.get("IsDocEditable").value)) || 0;
      serviceMasterUpdate['serviceId'] = this.data.ServiceId;

      let serviceDetDelete = {};
      serviceDetDelete['Id'] = 0;

      let serviceDetailInsert = [];
      let serviceDetailInsert1 = {};

      this.dataSource.data.forEach((element) => {

        serviceDetailInsert1['ServiceId'] = 0;
        serviceDetailInsert1['TariffId'] = this._serviceMasterService.myform.get("TariffId").value.TariffId || 0;
        serviceDetailInsert1['ClassId'] = element.ClassId || 0;
        serviceDetailInsert1['ClassRate'] = element.ClassRate || 0;
        serviceDetailInsert1['EffectiveDate'] = this._serviceMasterService.myform.get("EffectiveDate").value || "01/01/1900";

        serviceDetailInsert.push(serviceDetailInsert1);
        // console.log(InsertAdddetArr.length);
      })


      let submitData = {
        "serviceMasterUpdate": serviceMasterUpdate,
        "serviceDetDelete": serviceDetDelete,
        "serviceDetailInsert": serviceDetailInsert,

      };
      console.log(submitData);
      this._serviceMasterService.serviceMasterUpdate(submitData).subscribe(data => {
        if (data) {
          Swal.fire(' Service Updated !', ' Service Updated Successfully !', 'success').then((result) => {
            if (result.isConfirmed) {
              // this._matDialog.closeAll();
            }
          });
        } else {
          Swal.fire('Error !', 'Service not saved', 'error');
        }
      });

    }
    this.onClose();
  }
  // }

  onEnableDoctorCheckboxChange(event) {
    debugger;
    console.log(event)
    if (event.checked) {

      this.IsDoctor = false;
    } else {
      this.IsDoctor = true;

      // this._serviceMasterService.myform.get('DoctorID').reset();
      // // this._serviceMasterService.myform.get('DoctorID').setValidators([Validators.required]);
      // this._serviceMasterService.myform.get('DoctorID').enable;

      this._serviceMasterService.myform.get('DoctorID').reset();
      this._serviceMasterService.myform.get('DoctorID').setValidators([Validators.required]);
      this._serviceMasterService.myform.get('DoctorID').reset();
      this._serviceMasterService.myform.get('DoctorID').disable;
    }
  }

  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    this.dateTimeObj = dateTimeObj;
  }


  onIsEmergencyCheckboxChange(event) {
    if (event.checked) {

      this.IsEmergency = false;
    } else {
      this.IsEmergency = true;
    }
  }


  onCheckboxChange(event) {
    debugger;
    console.log(event)
    if (event.checked) {

      this.IsDoctor = false;
    } else {
      this.IsDoctor = true;
    }
  }



  onClear() {
    this._serviceMasterService.myform.reset();
  }
  onClose() {
    this._serviceMasterService.myform.reset();
    this.dialogRef.close();
  }



  onChange(isChecked: boolean) {
    console.log(isChecked);

    if (isChecked == true) {
      this.butDisabled = true;
      console.log(this.butDisabled);
    }
    else {
      this.butDisabled = false;
      console.log(this.butDisabled);
    }

  }
}
