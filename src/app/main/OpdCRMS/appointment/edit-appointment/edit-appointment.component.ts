import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegInsert } from '../appointment.component';
import { ReplaySubject, Subject } from 'rxjs';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent implements OnInit {



  submitted = false;
  now = Date.now();
  searchFormGroup: FormGroup;
  isRegSearchDisabled: boolean = true;
  newRegSelected: any = 'registration';
  snackmessage: any;
  msg: any = [];
  AgeYear: any;
  AgeMonth: any;
  AgeDay: any;
  HospitalList: any = [];
  PatientTypeList: any = [];
  TariffList: any = [];
  AreaList: any = [];
  MaritalStatusList: any = [];
  PrefixList: any = [];
  ReligionList: any = [];
  GenderList: any = [];
  DoctorList: any = [];
  Doctor1List: any = [];
  Doctor2List: any = [];
  cityList: any = [];
  stateList: any = [];
  countryList: any = [];
  selectedState = "";
  VisitTime: String;
  selectedStateID: any;
  selectedCountry: any;
  selectedCountryID: any;
  selectedHName: any;
  seelctedHospID: any;
  registerObj = new RegInsert({});
  selectedGender = "";
  selectedGenderID: any;
  capturedImage: any;
  isLinear = true;
  isLoading: string = '';
  Prefix: any;


  IsSaveupdate: any;
  IsSave: any;


  // prefix filter
  public bankFilterCtrl: FormControl = new FormControl();
  public filteredPrefix: ReplaySubject<any> = new ReplaySubject<any>(1);

  // city filter
  public cityFilterCtrl: FormControl = new FormControl();
  public filteredCity: ReplaySubject<any> = new ReplaySubject<any>(1);

  //religion filter
  public religionFilterCtrl: FormControl = new FormControl();
  public filteredReligion: ReplaySubject<any> = new ReplaySubject<any>(1);

  //maritalstatus filter
  public maritalstatusFilterCtrl: FormControl = new FormControl();
  public filteredMaritalstatus: ReplaySubject<any> = new ReplaySubject<any>(1);

  //area filter
  public areaFilterCtrl: FormControl = new FormControl();
  public filteredArea: ReplaySubject<any> = new ReplaySubject<any>(1);

  private _onDestroy = new Subject<void>();
  // private _onDestroy1 = new Subject<void>();

  options = [];

  isCompanySelected: boolean = false;
  filteredOptions: any;
  noOptionFound: boolean = false;
  screenFromString = 'registration';
  selectedPrefixId: any;

  matDialogRef: any;

  constructor(public _registerService: AppointmentService,
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditAppointmentComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router) { }


  ngOnInit(): void {

    this.IsSaveupdate = "true";
    console.log(this.data)
  
    this.searchFormGroup = this.createSearchForm();
    // this.getHospitalList();
    this.getPrefixList();
    this.getMaritalStatusList();
    this.getReligionList();
    // this.getPatientTypeList();
    this.getAreaList();
    // this.getCityList();
    this.getcityList();
    this.getDoctor1List();
    this.getDoctor2List();
    // this.addEmptyRow();

    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterPrefix();
      });

    this.cityFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCity();
      });

    this.religionFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterReligion();
      });

    this.maritalstatusFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMaritalstatus();
      });

    this.areaFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterArea();
      });



    if (this.data) {
      // this.IsSave="false";
      // this.IsSaveupdate='false';
      this.registerObj = this.data.registerObj;

      console.log(this.registerObj);

      // this.AgeYear = this.data.PatObj.AgeYear;
      this.Prefix = this.data.registerObj.PrefixID;
     
      this.setDropdownObjs1();
    }


  }

  closeDialog() {
    console.log("closed")
    //  this.dialogRef.close();
    // this._registerService.personalFormGroup.reset();
  }
  



  get f() { return this._registerService.mySaveForm.controls }

  // prefix filter
  private filterPrefix() {

    if (!this.PrefixList) {

      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
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
  // City filter code
  private filterCity() {

    if (!this.cityList) {
      return;
    }
    // get the search keyword
    let search = this.cityFilterCtrl.value;
    if (!search) {
      this.filteredCity.next(this.cityList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredCity.next(
      this.cityList.filter(bank => bank.CityName.toLowerCase().indexOf(search) > -1)
    );
  }
  // religion filter code
  private filterReligion() {

    if (!this.ReligionList) {
      return;
    }
    // get the search keyword
    let search = this.religionFilterCtrl.value;
    if (!search) {
      this.filteredReligion.next(this.ReligionList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredReligion.next(
      this.ReligionList.filter(bank => bank.ReligionName.toLowerCase().indexOf(search) > -1)
    );
  }
  // maritalstatus filter code
  private filterMaritalstatus() {

    if (!this.MaritalStatusList) {
      return;
    }
    // get the search keyword
    let search = this.maritalstatusFilterCtrl.value;
    if (!search) {
      this.filteredMaritalstatus.next(this.MaritalStatusList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredMaritalstatus.next(
      this.MaritalStatusList.filter(bank => bank.MaritalStatusName.toLowerCase().indexOf(search) > -1)
    );

  }
  // area filter code  
  private filterArea() {

    if (!this.AreaList) {
      return;
    }
    // get the search keyword
    let search = this.areaFilterCtrl.value;
    if (!search) {
      this.filteredArea.next(this.AreaList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredArea.next(
      this.AreaList.filter(bank => bank.AreaName.toLowerCase().indexOf(search) > -1)
    );

  }

  addEmptyRow() { }


  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

  getHospitalList() {
    //this._registerService.getHospitalCombo().subscribe(data => { this.HospitalList = data; })
  }


  getPrefixList() {

    this._registerService.getPrefixCombo().subscribe(data => {
      this.PrefixList = data;
      this.filteredPrefix.next(this.PrefixList.slice());
      if (this.data) {
        const ddValue = this.PrefixList.find(c => c.PrefixID == this.data.registerObj.PrefixID);
        this._registerService.personalFormGroup.get('PrefixID').setValue(ddValue);
      }
      this.onChangeGenderList(this._registerService.personalFormGroup.get('PrefixID').value);
    });
  }

  getCityList() {
    this._registerService.getCityList().subscribe(data => {
      this.cityList = data;
      this.filteredCity.next(this.cityList.slice());
    });
  }

  getPatientTypeList() {
    this._registerService.getPatientTypeCombo().subscribe(data => { this.PatientTypeList = data; })
  }


  getAreaList() {

    this._registerService.getAreaCombo().subscribe(data => {
      this.AreaList = data;
      this.filteredArea.next(this.AreaList.slice());

      if (this.data) {
        const ddValue = this.AreaList.find(c => c.AreaId == this.data.registerObj.AreaId);
        this._registerService.personalFormGroup.get('AreaId').setValue(ddValue);
      }
    });
  }

  getMaritalStatusList() {
    // this._registerService.getMaritalStatusCombo().subscribe(data => { this.MaritalStatusList = data; })
    this._registerService.getMaritalStatusCombo().subscribe(data => {
      this.MaritalStatusList = data;
      this.filteredMaritalstatus.next(this.MaritalStatusList.slice());
      if (this.data) {
        const ddValue = this.MaritalStatusList.find(c => c.MaritalStatusId == this.data.registerObj.MaritalStatusId);
        this._registerService.personalFormGroup.get('MaritalStatusId').setValue(ddValue);
      }
    });
  }

  getReligionList() {

    this._registerService.getReligionCombo().subscribe(data => {
      this.ReligionList = data;
      this.filteredReligion.next(this.ReligionList.slice());
      if (this.data) {
        const ddValue = this.ReligionList.find(c => c.ReligionId == this.data.registerObj.ReligionId);
        this._registerService.personalFormGroup.get('ReligionId').setValue(ddValue);
      }
    });
  }


  getGendorMasterList() {

    this._registerService.getGenderMasterCombo().subscribe(data => {
      this.GenderList = data;
      const ddValue = this.GenderList.find(c => c.GenderId == this.data.registerObj.GenderId);
      this._registerService.personalFormGroup.get('GenderId').setValue(ddValue);
    })
  }

  getcityList() {
    this._registerService.getCityList().subscribe(data => {
      this.cityList = data;
      this.filteredCity.next(this.cityList.slice());
      if (this.data) {
        const ddValue = this.cityList.find(c => c.CityId == this.data.registerObj.CityId);
        this._registerService.personalFormGroup.get('CityId').setValue(ddValue);
        this.onChangeCityList(this.data.registerObj.CityId)
      }
    });
  }

  onChangeStateList(CityId) {
    if (CityId > 0) {
      this._registerService.getStateList(CityId).subscribe(data => {
        this.stateList = data;
        this.selectedState = this.stateList[0].StateName;
        //  this._AdmissionService.myFilterform.get('StateId').setValue(this.selectedState);
      });
    }
  }
  onChangeCityList(CityId) {
    if (CityId > 0) {
      this._registerService.getStateList(CityId).subscribe(data => {
        this.stateList = data;
        this.selectedState = this.stateList[0].StateName;
        this.selectedStateID = this.stateList[0].StateId;
        this._registerService.personalFormGroup.get('StateId').setValue(this.stateList[0]);
        this.onChangeCountryList(this.selectedStateID);
      });
    } else {
      this.selectedState = null;
      this.selectedStateID = null;
      this.selectedCountry = null;
      this.selectedCountryID = null;
    }
  }
  onChangeCountryList(StateId) {
    if (StateId > 0) {
      this._registerService.getCountryList(StateId).subscribe(data => {
        this.countryList = data;
        this.selectedCountry = this.countryList[0].CountryName;
        this._registerService.personalFormGroup.get('CountryId').setValue(this.countryList[0]);
        this._registerService.personalFormGroup.updateValueAndValidity();
      });
    }
  }


  onChangeGenderList(prefixObj) {
    if (prefixObj) {
      this._registerService.getGenderCombo(prefixObj.PrefixID).subscribe(data => {
        this.GenderList = data;
        this._registerService.personalFormGroup.get('GenderId').setValue(this.GenderList[0]);

        this.selectedGenderID = this.GenderList[0].GenderId;
      });
    }
  }


  // searchRegList() {

  //   const dialogRef = this._matDialog.open(SearchPageComponent,
  //     {
  //       maxWidth: "90vw",
  //       maxHeight: "85vh", width: '100%', height: "100%"
  //     });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed - Insert Action', result);
  //     if (result) {

  //       this.registerObj = result as RegInsert;
  //       this.setDropdownObjs1();
  //     }
  //     //this.getRegistrationList();
  //   });
  // }

  getOptionText(option) {
    if (!option) return '';
    return option.FirstName + ' ' + option.LastName + ' (' + option.RegId + ')';
  }

  getSelectedObj(obj) {

    console.log('obj==', obj);

    let a, b, c;

    a = obj.AgeDay.trim();;
    b = obj.AgeMonth.trim();
    c = obj.AgeYear.trim();
    console.log(a, b, c);
    obj.AgeDay = a;
    obj.AgeMonth = b;
    obj.AgeYear = c;

    this.registerObj = obj;

  }


  setDropdownObjs1() {
    debugger;

    const toSelect = this.PrefixList.find(c => c.PrefixID == this.registerObj.PrefixID);
    this._registerService.personalFormGroup.get('PrefixID').setValue(toSelect);

    const toSelectMarital = this.MaritalStatusList.find(c => c.MaritalStatusId == this.registerObj.MaritalStatusId);
    this._registerService.personalFormGroup.get('MaritalStatusId').setValue(toSelectMarital);

    const toSelectReligion = this.ReligionList.find(c => c.ReligionId == this.registerObj.ReligionId);
    this._registerService.personalFormGroup.get('ReligionId').setValue(toSelectReligion);

    const toSelectArea = this.AreaList.find(c => c.AreaId == this.registerObj.AreaId);
    this._registerService.personalFormGroup.get('AreaId').setValue(toSelectArea);

    const toSelectCity = this.cityList.find(c => c.CityId == this.registerObj.CityId);
    this._registerService.personalFormGroup.get('CityId').setValue(toSelectCity);

    // const toSelectMat = this.cityList.find(c => c.CityId == this.registerObj.CityId);
    // this._registerService.personalFormGroup.get('CityId').setValue(toSelectCity);


    this.onChangeGenderList(this._registerService.personalFormGroup.get('PrefixID').value);

    this.onChangeCityList(this.registerObj.CityId);

    this._registerService.personalFormGroup.updateValueAndValidity();
    // this.dialogRef.close();

  }


  OnChangeDoctorList(departmentObj) {
    this._registerService.getDoctorMasterCombo(departmentObj.DepartmentId).subscribe(data => { this.DoctorList = data; })
  }

  getDoctor1List() {
    this._registerService.getDoctorMaster1Combo().subscribe(data => { this.Doctor1List = data; })
  }
  getDoctor2List() {
    this._registerService.getDoctorMaster2Combo().subscribe(data => { this.Doctor2List = data; })
  }


  onSubmit() {
    debugger;
    let reg = this.registerObj.RegId;
       
     
      this.isLoading = 'submit';
      let submissionObj = {};
      let registrationUpdate = {};
      // let visitUpdate = {};

      registrationUpdate['regId'] = this.registerObj.RegId;
      registrationUpdate['opration'] = "UPDATE";
      registrationUpdate['prefixId'] = this._registerService.personalFormGroup.get('PrefixID').value.PrefixID || 0;
      registrationUpdate['firstName'] = this.registerObj.FirstName ||'';
      registrationUpdate['middleName'] = this.registerObj.MiddleName || '';
      registrationUpdate['lastName'] = this.registerObj.LastName || '';
      registrationUpdate['address'] = this.registerObj.Address || '';
      registrationUpdate['City'] = this._registerService.personalFormGroup.get('CityId').value.CityName || '';
      registrationUpdate['pinNo'] = '';
      registrationUpdate['dateOfBirth'] =  this._registerService.personalFormGroup.get('DateofBirth').value || '01/01/1900';
      registrationUpdate['age'] = this.registerObj.AgeYear || 0;//this.registerObj.Age;
      registrationUpdate['genderID'] = this._registerService.personalFormGroup.get('GenderId').value.GenderId || 0;
      registrationUpdate['phoneNo'] = this._registerService.personalFormGroup.get('PhoneNo').value || 0;
      registrationUpdate['mobileNo'] = this.registerObj.MobileNo || '';
      registrationUpdate['updatedBy'] = this.accountService.currentUserValue.user.id;
      registrationUpdate['ageYear'] = this.registerObj.AgeYear || '';
      registrationUpdate['ageMonth'] = this.registerObj.AgeMonth || '';
      registrationUpdate['ageDay'] = this.registerObj.AgeDay || '';
      registrationUpdate['countryId'] = this._registerService.personalFormGroup.get('CountryId').value.CountryId || '';
      registrationUpdate['stateId'] = this._registerService.personalFormGroup.get('StateId').value.StateId || '';
      registrationUpdate['cityId'] = this._registerService.personalFormGroup.get('CityId').value.CityId || '';
      registrationUpdate['maritalStatusId'] = this._registerService.personalFormGroup.get('MaritalStatusId').value ? this._registerService.personalFormGroup.get('MaritalStatusId').value.MaritalStatusId : 0;
      registrationUpdate['isCharity'] = false;
    
      submissionObj['registrationUpdate'] = registrationUpdate;
      // // visit detail
      // visitUpdate['VisitId'] = 0;
      // visitUpdate['RegID'] = this.registerObj.RegId;
      // visitUpdate['VisitDate'] = '2023-06-22T09:52:54.616Z',// this.dateTimeObj.date;
      // visitUpdate['VisitTime'] = '2023-06-22T09:52:54.616Z',//this.dateTimeObj.time;
      // visitUpdate['StudyId'] = this._registerService.personalFormGroup.get('CaseId').value.StudyId ? this._registerService.personalFormGroup.get('CaseId').value.StudyId : 0;
      // visitUpdate['UnitId'] = this.VisitFormGroup.get('HospitalId').value.HospitalId ? this.VisitFormGroup.get('HospitalId').value.HospitalId : 0; // this.VisitFormGroup.get('UnitId').value.UnitId ? this.VisitFormGroup.get('UnitId').value.UnitId: 0;
      // visitUpdate['PatientTypeId'] = this.VisitFormGroup.get('PatientTypeID').value.PatientTypeId;//.PatientTypeID;//? this.VisitFormGroup.get('PatientTypeID').value.PatientTypeID : 0;
      // visitUpdate['ConsultantDocId'] = this.VisitFormGroup.get('DoctorID').value.DoctorId;//? this.VisitFormGroup.get('DoctorId').value.DoctorId : 0;
      // visitUpdate['RefDocId'] = this.VisitFormGroup.get('DoctorIdOne').value.DoctorId;// ? this.VisitFormGroup.get('DoctorIdOne').value.DoctorIdOne : 0;

      // visitUpdate['TariffId'] = this.VisitFormGroup.get('TariffId').value.TariffId ? this.VisitFormGroup.get('TariffId').value.TariffId : 0;
      // visitUpdate['CompanyId'] = this.VisitFormGroup.get('CompanyId').value.CompanyId ? this.VisitFormGroup.get('CompanyId').value.CompanyId : 0;
      // visitUpdate['AddedBy'] = this.accountService.currentUserValue.user.id;
      // visitUpdate['updatedBy'] = 0,//this.VisitFormGroup.get('RelationshipId').value.RelationshipId ? this.VisitFormGroup.get('RelationshipId').value.RelationshipId : 0;
      // visitUpdate['IsCancelled'] = 0;
      // visitUpdate['IsCancelledBy'] = 0;
      // visitUpdate['IsCancelledDate'] = this.dateTimeObj.date;

      // visitUpdate['ClassId'] = 1; // this.VisitFormGroup.get('ClassId').value.ClassId ? this.VisitFormGroup.get('ClassId').value.ClassId : 0;
      // visitUpdate['DepartmentId'] = this.VisitFormGroup.get('DoctorID').value.DepartmentId;//? this.VisitFormGroup.get('DepartmentId').value.DepartmentId : 0;
      // debugger;
      // console.log(this.Patientnewold);
      
      // visitUpdate['PatientOldNew'] = this.Patientnewold;
      // visitUpdate['FirstFollowupVisit'] = 0,// this.VisitFormGroup.get('RelativeAddress').value ? this.VisitFormGroup.get('RelativeAddress').value : '';
      // visitUpdate['appPurposeId'] = this.VisitFormGroup.get('PurposeId').value.PurposeId;// ? this.VisitFormGroup.get('RelativeAddress').value : '';
      // visitUpdate['FollowupDate'] = this.dateTimeObj.date;// this._registerService.personalFormGroup.get('PhoneNo').value ? this._registerService.personalFormGroup.get('PhoneNo').value : '';
   
      // submissionObj['visitUpdate'] = visitUpdate;

      
      // tokenNumberWithDoctorWiseUpdate['patVisitID'] = 0;
      // submissionObj['tokenNumberWithDoctorWiseUpdate'] = tokenNumberWithDoctorWiseUpdate;

      console.log(submissionObj);
      this._registerService.appointregupdate(submissionObj).subscribe(response => {
        console.log(response);
        if (response) {
          Swal.fire('Congratulations !', 'Registered Appoinment Updated Successfully  !', 'success').then((result) => {
            if (result.isConfirmed) {
              this._matDialog.closeAll();
            }
            
          });
        } else {
          Swal.fire('Error !', 'Appointment not Updated', 'error');
        }
        this.isLoading = '';
      });
      
    
  }


  onClose() {
    this.dialogRef.close();
  }

  createSearchForm() {
    return this.formBuilder.group({
      regRadio: ['registration'],
      RegId: [{ value: '', disabled: this.isRegSearchDisabled }]
    });
  }
  onChangeDateofBirth(DateOfBirth) {
    if (DateOfBirth) {
      const todayDate = new Date();
      const dob = new Date(DateOfBirth);
      const timeDiff = Math.abs(Date.now() - dob.getTime());
      // this.registerObj.AgeYear = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
      // this.registerObj.AgeMonth = Math.abs(todayDate.getMonth() - dob.getMonth());
      // this.registerObj.AgeDay = Math.abs(todayDate.getDate() - dob.getDate());
      this.registerObj.DateofBirth = DateOfBirth;
      this._registerService.personalFormGroup.get('DateOfBirth').setValue(DateOfBirth);
    }

  }

  
  getSearchList() {
    var m_data = {
      "F_Name": `${this.searchFormGroup.get('RegId').value}%`,
      "L_Name": '%',
      "Reg_No": '0',
      "From_Dt": '01/01/1900',
      "To_Dt": '01/01/1900',
      "MobileNo": '%'
    }
    console.log(m_data);
    if (this.searchFormGroup.get('RegId').value.length >= 1) {
      this._registerService.getRegistrationList(m_data).subscribe(resData => {

        this.filteredOptions = resData;

        if (this.filteredOptions.length == 0) {
          this.noOptionFound = true;
        } else {
          this.noOptionFound = false;
        }

      });
    }

  }
  IsCharity: any;
  onChangeIsactive(SiderOption) {
    this.IsCharity = SiderOption.checked
    console.log(this.IsCharity);
  }

  myFunction(s) {
    this.snackmessage = s;
    console.log(s);
    console.log(this.snackmessage);
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
  }
}
