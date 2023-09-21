import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../appointment.service';
import { RegInsert } from '../../appointment.component';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewDocumentComponent } from '../new-document/new-document.component';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from 'app/core/services/authentication.service';
import Swal from 'sweetalert2';
import { DocPresentationComponent } from '../doc-presentation/doc-presentation.component';
import { AngioplastiComponent } from '../angioplasti/angioplasti.component';
import { ResultComponent } from '../result/result.component';
import { ProcedureHemodynamicsComponent } from '../procedure-hemodynamics/procedure-hemodynamics.component';
import { DempgraphicComponent } from '../dempgraphic/dempgraphic.component';
import { id } from '@swimlane/ngx-charts';
import { LesionPreprationComponent } from '../lesion-prepration/lesion-prepration.component';

@Component({
  selector: 'app-new-doc-registration',
  templateUrl: './new-doc-registration.component.html',
  styleUrls: ['./new-doc-registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewDocRegistrationComponent implements OnInit {
  searchFormGroup: FormGroup;
  filteredOptions: any;
  noOptionFound: boolean = false;

  registerObj = new RegInsert({});
  personalFormGroup: FormGroup;
  submitted = false;
  isLoading: any;
  isPrefixSelected: boolean = false;
  optionsPrefix: any[] = [];
  filteredOptionsPrefix: Observable<string[]>;
  PrefixList: any = [];
  GenderList: any = [];
  selectedGenderID: any;
  screenFromString = 'admission-form';
  RegId: any;
  PatientName: any = '';
  Mobileno: any = '';
  isRegIdSelected: boolean = false;
  RegNo: any;
  PatientHeaderObj = {};

  Doctype = [
    { id: 1, name: "Acute Coronary Syndrome" },
    { id: 2, name: "Stable Coronary Syndrome" },
    { id: 3, name: "Incidental / Detection of CAD" },
    // {id: 4, name: "Brazil"},
    // {id: 5, name: "England"}
  ];

  Pagestype = [
    { id: 1, name: "Book Patient Appointment"},
    { id: 2, name: "Procedure Hemodynamics" },
    { id: 3, name: "Demographic" },
    { id: 4, name: "Anjioplasti" },
    { id: 5, name: "Lesion Preapration"},
    { id: 6, name: "DocPresentationComponent"},
    { id: 7, name: "Result" }
  ];
  constructor(public _AppointmentService: AppointmentService,
    // public dialogRef: MatDialogRef<NewDocRegistrationComponent>,
    private accountService: AuthenticationService,
    private formBuilder: FormBuilder, public _matDialog: MatDialog,) { }

  ngOnInit(): void {
    this.personalFormGroup = this.createPesonalForm();
    this.searchFormGroup = this.createSearchForm();

    this.getPrefixList();
  }

  getOptionText(option) {
    if (!option) return '';
    return option.FirstName + ' ' + option.LastName + ' (' + option.RegId + ')';
  }

  createSearchForm() {
    return this.formBuilder.group({
      RegId: ['']
    });
  }
  getSelectedObj(obj) {
    debugger
    this.registerObj = obj;
    this.PatientName = this.registerObj.FirstName + ' ' + this.registerObj.MiddleName + ' ' + this.registerObj.LastName;
    this.Mobileno = this.registerObj.MobileNo;
    this.RegNo = this.registerObj.RegNo;
  }

  getSearchList() {
    debugger

    var m_data = {
      "Keyword": `${this.personalFormGroup.get('RegID').value}%`
    }
    if (this.personalFormGroup.get('RegID').value.length >= 1) {
      this._AppointmentService.getSearchRegistrationList1(m_data).subscribe(resData => {

        this.filteredOptions = resData;
        console.log(resData);
        if (this.filteredOptions.length == 0) {
          this.noOptionFound = true;
        } else {
          this.noOptionFound = false;
        }

      });
    }

  }

  
  getappointment() {
    var m={
      "PatientName":this.PatientName,
      "RegNo":this.RegNo,
      "MobileNo":this.Mobileno
    }

    const dialogRef = this._matDialog.open(DocPresentationComponent,
      {
        maxWidth: "60%",
        height: '500px',
        width: '100%',
        data: {
          advanceObj: m,
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);

    });
  }

  // gethyamonodynamic() {
  //   const dialogRef = this._matDialog.open(ProcedureHemodynamicsComponent,
  //     {
  //       maxWidth: "60%",
  //       height: '700px',
  //       width: '100%',
  //       data: {
  //         advanceObj:m,
  //       }
  //     });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed - Insert Action', result);

  //   });
  // }
  getanigioplasti() {

    var m={
      "PatientName":this.PatientName,
      "RegNo":this.RegNo,
      "MobileNo":this.Mobileno
    }

    const dialogRef = this._matDialog.open(AngioplastiComponent,
      {
        maxWidth: "80%",
        height: '1000px',
        width: '100%',
        data: {
          advanceObj: m
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);

    });
  }

  getProcedure() {

    var m={
      "PatientName":this.PatientName,
      "RegNo":this.RegNo,
      "MobileNo":this.Mobileno
    }

    const dialogRef = this._matDialog.open(ProcedureHemodynamicsComponent,
      {
        maxWidth: "90%",
        height: '1000px',
        width: '100%',
        data: {
          advanceObj: m,
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);

    });
  }

  // getresult() {
  //   const dialogRef = this._matDialog.open(ResultComponent,
  //     {
  //       maxWidth: "60%",
  //       height: '700px',
  //       width: '100%',
  //       data: {
  //         advanceObj: this.PatientHeaderObj,
  //       }
  //     });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed - Insert Action', result);

  //   });
  // }

  onChangePageList(Id){
    debugger
    console.log(Id)
    
    this.PatientHeaderObj['PatientName'] = this.PatientName;
    this.PatientHeaderObj['RegNo'] = this.RegNo;
    this.PatientHeaderObj['MobileNo'] = this.Mobileno;


    if(Id.id == 1){
      const dialogRef = this._matDialog.open(DocPresentationComponent,
        {
          maxWidth: "90%",
          height: '900px',
          width: '100%',
          data: {
            advanceObj: this.PatientHeaderObj,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
  
      });
    }else if(Id.id == 2){
      const dialogRef = this._matDialog.open(ProcedureHemodynamicsComponent,
        {
          maxWidth: "90%",
          height: '1000px',
          width: '100%',
          data: {
            advanceObj: this.PatientHeaderObj,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
  
      });
    }else if(Id.id == 3){
      const dialogRef = this._matDialog.open(DempgraphicComponent,
        {
          maxWidth: "90%",
          height: '700px',
          width: '100%',
          data: {
            advanceObj: this.PatientHeaderObj,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
  
      });
    }else if(Id.id == 4){
      const dialogRef = this._matDialog.open(AngioplastiComponent,
        {
          maxWidth: "90%",
          height: '900px',
          width: '100%',
          data: {
            advanceObj: this.PatientHeaderObj,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
  
      });
    }else if(Id.id == 5){
    
    const dialogRef = this._matDialog.open(LesionPreprationComponent,
      {
        maxWidth: "60%",
        height: '700px',
        width: '100%',
        data: {
          advanceObj: this.PatientHeaderObj,
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);

    });
  }else if(Id.id == 6){
    
    const dialogRef = this._matDialog.open(DocPresentationComponent,
      {
        maxWidth: "60%",
        height: '700px',
        width: '100%',
        data: {
          advanceObj: this.PatientHeaderObj,
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);

    });
  }    
   else if(Id.id == 7){
    
      const dialogRef = this._matDialog.open(ResultComponent,
        {
          maxWidth: "60%",
          height: '700px',
          width: '100%',
          data: {
            advanceObj: this.PatientHeaderObj,
          }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
  
      });
    }
  
  }



  onChangeDocList(Id) {
    debugger
     
    this.PatientHeaderObj['PatientName'] = this.PatientName;
    this.PatientHeaderObj['RegNo'] = this.RegNo;
    this.PatientHeaderObj['MobileNo'] = this.Mobileno;


    const dialogRef = this._matDialog.open(DocPresentationComponent,
      {
        maxWidth: "60%",
        height: '500px',
        width: '100%',
        data: {
          "DoctypeId": Id.id,
          advanceObj: this.PatientHeaderObj,
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);

    });
  }
  createPesonalForm() {
    return this.formBuilder.group({
      RegId: '',
      PrefixID: '',
      FirstName: ['', [
        Validators.required,
        Validators.pattern("^[A-Za-z] *[a-zA-Z]*$"),
      ]],
      MiddleName: ['', [

        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      LastName: ['', [
        Validators.required,
        Validators.pattern("^[A-Za-z]*[a-zA-z]*$"),
      ]],
      GenderId: '',

      DateOfBirth: [{ value: this.registerObj.DateofBirth }],
      AgeYear: ['', [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern("^[0-9]*$")]],
      AgeMonth: ['', [
        Validators.pattern("^[0-9]*$")]],
      AgeDay: ['', [

        Validators.pattern("^[0-9]*$")]],
      PhoneNo: ['', [Validators.minLength(10),
      Validators.maxLength(15),
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      ]],
      Doctorname: '',
      EmailId: '',
      RegID: [''],
      PageId:['']
    });
  }

  private _filterPrex(value: any): string[] {
    if (value) {
      const filterValue = value && value.PrefixName ? value.PrefixName.toLowerCase() : value.toLowerCase();
      return this.optionsPrefix.filter(option => option.PrefixName.toLowerCase().includes(filterValue));
    }

  }


  getOptionTextPrefix(option) {
    return option.PrefixName;
  }


  getPrefixList() {
    this._AppointmentService.getPrefixCombo().subscribe(data => {
      this.PrefixList = data;
      this.optionsPrefix = this.PrefixList.slice();
      this.filteredOptionsPrefix = this.personalFormGroup.get('PrefixID').valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filterPrex(value) : this.PrefixList.slice()),
      );

    });
    this.onChangeGenderList(this.personalFormGroup.get('PrefixID').value);
  }


  onChangeGenderList(prefixObj) {
    if (prefixObj) {
      this._AppointmentService.getGenderCombo(prefixObj.PrefixID).subscribe(data => {
        this.GenderList = data;
        this.personalFormGroup.get('GenderId').setValue(this.GenderList[0]);

        this.selectedGenderID = this.GenderList[0].GenderId;
      });
    }
  }

  onChangeDateofBirth(DateOfBirth) {
    debugger
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

  onPresentation() {
    const dialogRef = this._matDialog.open(NewDocumentComponent,
      {
        maxWidth: "80%",
        height: '600px',
        width: '100%',
        data: {
          "Divtype": "Acute Coronary Syndrome"
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);

    });
  }


  submitAdmissionForm() {
    // debugger;

    // this.isLoading = 'submit';
    let submissionObj = {};
    let regInsert = {};
    let admissionNewInsert = {};
    regInsert['RegId'] = 0;
    regInsert['regDate'] = this.dateTimeObj.date //this.registerObj.RegDate;
    regInsert['regTime'] = this.dateTimeObj.time;
    regInsert['prefixId'] = this.personalFormGroup.get('PrefixID').value.PrefixID;
    regInsert['firstName'] = this.registerObj.FirstName || '';
    regInsert['middleName'] = this.registerObj.MiddleName || '';
    regInsert['lastName'] = this.registerObj.LastName || '';
    regInsert['address'] = this.registerObj.Address || '';
    regInsert['city'] = this.personalFormGroup.get('CityId').value.CityName;
    regInsert['PinNo'] = '';
    regInsert['dateOfBirth'] = this.registerObj.DateofBirth;
    regInsert['age'] = this.registerObj.AgeYear;//this.registerObj.Age;
    regInsert['genderID'] = this.personalFormGroup.get('GenderId').value.GenderId;
    regInsert['phoneNo'] = this.registerObj.PhoneNo || '';
    regInsert['mobileNo'] = this.registerObj.MobileNo || '';
    regInsert['addedBy'] = this.accountService.currentUserValue.user.id;
    regInsert['UpdatedBy'] = 0,// this.accountService.currentUserValue.user.id;
      regInsert['ageYear'] = this.registerObj.AgeYear || '';
    regInsert['ageMonth'] = this.registerObj.AgeMonth || '';
    regInsert['ageDay'] = this.registerObj.AgeDay || '';
    regInsert['countryId'] = this.personalFormGroup.get('CountryId').value.CountryId;
    regInsert['stateId'] = this.personalFormGroup.get('StateId').value.StateId;
    regInsert['cityId'] = this.personalFormGroup.get('CityId').value.CityId;
    regInsert['maritalStatusId'] = this.personalFormGroup.get('MaritalStatusId').value ? this.personalFormGroup.get('MaritalStatusId').value.MaritalStatusId : 0;
    regInsert['isCharity'] = false;
    regInsert['religionId'] = this.personalFormGroup.get('ReligionId').value ? this.personalFormGroup.get('ReligionId').value.ReligionId : 0;
    regInsert['areaId'] = this.personalFormGroup.get('AreaId').value ? this.personalFormGroup.get('AreaId').value.AreaId : 0;
    regInsert['IsSeniorCitizen'] = 1;//this.personalFormGroup.get('IsSeniorCitizen').value ? this.personalFormGroup.get('ReligionId').value.ReligionId : 0;

    // console.log(submissionObj);
    this._AppointmentService.RegDocInsert(submissionObj).subscribe(response => {
      console.log(response);
      if (response) {
        Swal.fire('Congratulations !', 'Admission save Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            let m = response;
            // this.getPrint(m);
            // console.log( this.getPrint(m));
            this._matDialog.closeAll();

          }
        });
      } else {
        Swal.fire('Error !', 'Admission not saved', 'error');
      }
      this.isLoading = '';
    });





  }

  onClose() {
    // this.dialogRef.close();
  }

  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    // console.log('dateTimeObj==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }


  onSubmit() { }
}
