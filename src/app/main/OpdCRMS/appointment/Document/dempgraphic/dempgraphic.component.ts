import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../appointment.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { RegInsert } from '../../appointment.component';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dempgraphic',
  templateUrl: './dempgraphic.component.html',
  styleUrls: ['./dempgraphic.component.scss']
})
export class DempgraphicComponent implements OnInit {

  registerObj = new RegInsert({});
  personalFormGroup:FormGroup;
  PrefixList: any = [];
  Doctor1List:any = [];
  GenderList: any = [];
  selectedGenderID: any;
  submitted = false;
  screenFromString = 'admission-form';

  regobj:any;
  PatientName:any;
  RegNo:any;
  MobileNo:any;
  // prefix filter
  public prefixFilterCtrl: FormControl = new FormControl();
  public filteredPrefix: ReplaySubject<any> = new ReplaySubject<any>(1);

  
  //doctorone filter
  public doctoroneFilterCtrl: FormControl = new FormControl();
  public filteredDoctorone: ReplaySubject<any> = new ReplaySubject<any>(1);


  private _onDestroy = new Subject<void>();

  constructor(public _opappointmentService: AppointmentService,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    public dialogRef: MatDialogRef<DempgraphicComponent>,
    public datePipe: DatePipe,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {


    this.personalFormGroup = this.createPesonalForm();
    this.personalFormGroup.markAllAsTouched();

    if(this.data){
      this.regobj=this.data.advanceObj;
      this.PatientName=this.regobj.PatientName;
      this.RegNo=this.regobj.RegNo;
      this.MobileNo=this.regobj.MobileNo;

    }

    this.getPrefixList();

    this.prefixFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterPrefix();
    });

  }




  createPesonalForm() {
    return this.formBuilder.group({
      RegId: '',
      PrefixId: '',
      PrefixID: '',
      FirstName: ['', [
        Validators.required,
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      MiddleName: ['', [

        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      LastName: ['', [
        Validators.required,
        Validators.pattern("^[A-Za-z]*[a-zA-z]*$"),
      ]],
      GenderId: '',
     
      DateOfBirth:[{ value: this.registerObj.DateofBirth }],
      AgeYear: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$")]],
    
      MobileNo: ['', [Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[7-9]{1}[0-9]{9}$"),
      Validators.minLength(10),
      Validators.maxLength(10),]], 
      EmailId: '',
      RefDocId:''

    });
    
  }

  
  // prefix filter
  private filterPrefix() {
    if (!this.PrefixList) {

      return;
    }
    // get the search keyword
    let search = this.prefixFilterCtrl.value;
    if (!search) {
      this.filteredPrefix.next(this.PrefixList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredPrefix.next(
      this.PrefixList.filter(bank => bank.PrefixName.toLowerCase().indexOf(search) > -1)
    );
  }

  getPrefixList() {
    this._opappointmentService.getPrefixCombo().subscribe(data => {
      this.PrefixList = data;
      this.filteredPrefix.next(this.PrefixList.slice());
    });
  }

  
  // doctorone filter code  
  private filterDoctorone() {

    if (!this.Doctor1List) {
      return;
    }
    // get the search keyword
    let search = this.doctoroneFilterCtrl.value;
    if (!search) {
      this.filteredDoctorone.next(this.Doctor1List.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredDoctorone.next(
      this.Doctor1List.filter(bank => bank.DoctorName.toLowerCase().indexOf(search) > -1)
    );
  }

  getDoctor1List() {
    
    this._opappointmentService.getDoctorMaster1Combo().subscribe(data => {
      this.Doctor1List = data;
      this.filteredDoctorone.next(this.Doctor1List.slice());
    });

  }

  onChangeGenderList(prefixObj) {
    if (prefixObj) {
      this._opappointmentService.getGenderCombo(prefixObj.PrefixID).subscribe(data => {
        this.GenderList = data;
        this.personalFormGroup.get('GenderId').setValue(this.GenderList[0]);
        
        this.selectedGenderID = this.GenderList[0].GenderId;
      });
    }
  }
  onChangeDateofBirth(DateOfBirth) {
    if (DateOfBirth) {
      const todayDate = new Date();
      const dob = new Date(DateOfBirth);
      const timeDiff = Math.abs(Date.now() - dob.getTime());
      this.registerObj.AgeYear = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
      this.registerObj.AgeMonth = Math.abs(todayDate.getMonth() - dob.getMonth());
      this.registerObj.AgeDay = Math.abs(todayDate.getDate() - dob.getDate());
      this.registerObj.DateofBirth = DateOfBirth;
      this.personalFormGroup.get('DateOfBirth').setValue(DateOfBirth);
    }

  }

  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    // console.log('dateTimeObj==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }
  onClose(){
    this.dialogRef.close();
  }
  Submit(){

  }

}
