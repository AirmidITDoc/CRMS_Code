import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { AppointmentService } from '../appointment.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-assign-visit-infor',
  templateUrl: './assign-visit-infor.component.html',
  styleUrls: ['./assign-visit-infor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AssignVisitInforComponent implements OnInit {
  registerObj = new VisitMaster({});
  VisitFormGroup: FormGroup;

 //department filter
  public departmentFilterCtrl: FormControl = new FormControl();
  public filteredDepartment: ReplaySubject<any> = new ReplaySubject<any>(1);
  DepartmentList: any = [];
  formBuilder: any;
  
  constructor(
    public _opappointmentService: AppointmentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AssignVisitInforComponent>,
  ) { }

  ngOnInit(): void {

    this.VisitFormGroup = this.createVisitdetailForm();

    if (this.data) {
      this.registerObj = this.data.registerObj;
      console.log(this.registerObj);
    }
  }

  private filterDepartment() {

    if (!this.DepartmentList) {
      return;
    }
    // get the search keyword
    let search = this.departmentFilterCtrl.value;
    if (!search) {
      this.filteredDepartment.next(this.DepartmentList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredDepartment.next(
      this.DepartmentList.filter(bank => bank.departmentName.toLowerCase().indexOf(search) > -1)
    );
  }

  getDepartmentList() {
    this._opappointmentService.getDepartmentCombo().subscribe(data => {
      this.DepartmentList = data;
      
      this.filteredDepartment.next(this.DepartmentList.slice());
      this.VisitFormGroup.get('Departmentid').setValue(this.DepartmentList[0]);
    });
  }


  createVisitdetailForm() {
    return this.formBuilder.group({
      DoctorId: '',
      DoctorID: '',
      DepartmentId: '',
      Departmentid: '',
      DoctorIdOne: '',
      DoctorIdTwo: '',
      VisitId: '',
      VisitDate:[{ value: this.registerObj.VisitDate }],
      VisitTime:[{ value: this.registerObj.VisitTime }],
      ConsultantDocId: '',
      RefDocId: '',
      Doctorname: '',
      RefDocName: '',
      IsMark: '',
      Comments: '',
      Intime: '',
      OutTime: ''
    });
  }
  
  onSave(){

  }
  onClose() {
     this.dialogRef.close();
  }

}

export class VisitMaster {
  VisitId: Number;
  VisitTitle:any;
  PrefixId: number;
  RegNoWithPrefix: number;
  PatientName: string;
  VisitDate: Date;
  VisitTime: Date;
  HospitalID: number;
  HospitalName: string;
  PatientTypeID: number;
  PatientTypeId: number;
  PatientType: string;
  CompanyId: number;
  OPDNo: string;
  TariffId: number;
  TariffName: string;
  ConsultantDocId: number;
  RefDocId: number;
  Doctorname: string;
  RefDocName: string;
  DepartmentId: number;
  appPurposeId: number;
  patientOldNew: Boolean;
  isMark: boolean;
  isXray: boolean;
  AddedBy: number;
  MPbillNo: number;
  RegNo: any;
  currentDate = new Date();
  IsMark: any;
  IsXray: any;
  Comments: any;
  Intime: any;
  OutTime: any;
  DoctorId: any;
  AgeYear: any;
  VistDateTime: any;
  SubjectName:any;
  RegId:any;
  BillId:any;
  PBillNo:any;
  ExtRegNo:any;
  /**
   * Constructor
   *
   * @param VisitMaster
   */
  constructor(VisitMaster) {
    {
      this.VisitId = VisitMaster.VisitId || 0;
      this.PrefixId = VisitMaster.PrefixId || 0,
        this.RegNoWithPrefix = VisitMaster.RegNoWithPrefix || '';
      this.PatientName = VisitMaster.PatientName || '';
      this.VisitDate = VisitMaster.VisitDate || this.currentDate;
      this.VisitTime = VisitMaster.VisitTime || this.currentDate;
      this.HospitalID = VisitMaster.HospitalID || '';
      this.HospitalName = VisitMaster.HospitalName || '';
      this.PatientTypeID = VisitMaster.PatientTypeID || '';
      this.PatientTypeId = VisitMaster.PatientTypeId || '';
      this.PatientType = VisitMaster.PatientType || '';
      this.CompanyId = VisitMaster.CompanyId || '';
      this.TariffId = VisitMaster.TariffId || '';
      this.OPDNo = VisitMaster.OPDNo || '';
      this.ConsultantDocId = VisitMaster.ConsultantDocId || '';
      this.Doctorname = VisitMaster.Doctorname || '';
      this.RefDocId = VisitMaster.VisitTime || '';
      this.RefDocName = VisitMaster.RefDocName || '';
      this.DepartmentId = VisitMaster.DepartmentId || '';
      this.patientOldNew = VisitMaster.patientOldNew || '';
      this.isXray = VisitMaster.isXray || '';
      this.AddedBy = VisitMaster.AddedBy || '';
      this.MPbillNo = VisitMaster.MPbillNo || '';
      this.RegNo = VisitMaster.RegNo || '';
      this.DoctorId = VisitMaster.DoctorId || 0;
      this.AgeYear = VisitMaster.AgeYear || '';
      this.VistDateTime = VisitMaster.VistDateTime || '';
      this.SubjectName = VisitMaster.SubjectName || '';
      this.RegId = VisitMaster.RegId || 0;
      this.VisitTitle = VisitMaster.VisitTitle || '';
      this.BillId = VisitMaster.BillId || '';
      this.PBillNo=VisitMaster.PBillNo|| '';
      this.ExtRegNo =VisitMaster.ExtRegNo || 0;
    }
    }
  
}

