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
import { ResultComponent } from '../result/result.component';
import { ProcedureHemodynamicsComponent } from '../procedure-hemodynamics/procedure-hemodynamics.component';
import { DempgraphicComponent } from '../dempgraphic/dempgraphic.component';
import { id } from '@swimlane/ngx-charts';
import { LesionPreprationComponent } from '../lesion-prepration/lesion-prepration.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-new-doc-registration',
  templateUrl: './new-doc-registration.component.html',
  styleUrls: ['./new-doc-registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewDocRegistrationComponent implements OnInit {
  searchFormGroup: FormGroup;
  accessFormGroup: FormGroup;
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

  datalist: any = [];
  Accessdatalist: any = [];
  proceduredatalist: any = [];
  wiredatalist: any = [];
  Imgimgdatalist: any = [];
  Physiodatalist: any = [];

  AccType:any;
  InducibleTypeId:any;
  InducibleTypeStatus:any;

  Doctype = [
    { id: 1, name: "Acute Coronary Syndrome" },
    { id: 2, name: "Stable Coronary Syndrome" },
    { id: 3, name: "Incidental / Detection of CAD" },
    // {id: 4, name: "Brazil"},
    // {id: 5, name: "England"}
  ];

  Pagestype = [
    { id: 1, name: "Book Patient Appointment" },
    { id: 2, name: "Procedure Hemodynamics" },
    { id: 3, name: "Demographic" },
    { id: 4, name: "Anjioplasti" },
    { id: 5, name: "Lesion Preapration" },
    { id: 6, name: "DocPresentationComponent" },
    { id: 7, name: "Result" }
  ];

  RWMAList = [
    { id: 1, name: "Anterior" },
    { id: 2, name: "Posterior" },
    { id: 3, name: "Lateral" },
    { id: 4, name: "Inferior" },
    { id: 5, name: "Apical Preapration" },
   
  ];
  PApressureList =[
    { id:1,name:"Normal"},
    { id:2, name:"Raised"}
  ]
  ValveList =[
    { id: 1, name: "Mitral" },
    { id: 2, name: "Aortic" },
  ]

  SeverityList = [
    { id: 1, name: "100%" },
    { id: 2, name: "Critical (80-99%)" },
    { id: 3, name: "Significant (Non-Critical 70-80%)" },
    { id: 4, name: "Intermediate (50-70%)" },
    { id: 5, name: "Not Significant (50%) " },
  ];

  Accessvalue1List  = [
    { id: 1, name: "Femoral" },
    { id: 2, name: "Radial" },
       
  ];
  Accessvalue2List  = [
    { id: 1, name: "Righ" },
    { id: 2, name: "Left" },
       
  ];

  IronDefList = [
    { id: 1, name: "Yes" },
    { id: 2, name: "No" },
       
  ];

  USGList = [
    { id: 1, name: "Yes" },
    { id: 2, name: "No" },
       
  ];

  FluoroList = [
    { id: 1, name: "Yes" },
    { id: 2, name: "No" },
       
  ];
  PunctureList = [
    { id: 1, name: "Yes" },
    { id: 2, name: "No" },
       
  ];


  DevicetypeList = [
    { id: 1, name: "Mild" },
    { id: 2, name: "Moderate" },
    { id: 3, name: "Severe" },
    
  ];

  CalcifiedList = [
    { id: 1, name: "Pace Wire" },
    { id: 2, name: "Impella" },
    { id: 3, name: "IABP" },
    { id: 4, name: "Guide Catheter" },
    { id: 5, name: "Vanous Access" },
  
  ];


  WireList = [
    { id: 1, name: "Runthrough NS%" },
    { id: 2, name: "Pilot 50" },
    { id: 3, name: "Pilot 200" },
    { id: 4, name: "ULTIMATEbros 3" },
    { id: 5, name: "Gaia 1" },
    { id: 6, name: "Gaia 2" },
    { id: 7, name: "Gaia 3" },
    { id: 8, name: "Gaia Next 1" },
    { id: 9, name: "Gaia Next 2" },
    { id: 10, name: "Gaia Next 3" },
    { id: 11, name: "Conquest Pro 9" },
    { id: 12, name: "Conquest Pro 12" },
    { id: 13, name: "Conquest Pro" },
    { id: 14, name: "Fielder FC" },
    { id: 15, name: "Whisper" },
    { id: 16, name: "Whisper ES" },
    { id: 17, name: "BMW" },
    // { id: 10, name: "Whisper ES" },
  ];
  MicroCatheterList= [
    { id: 1, name: "Finecross" },
    { id: 2, name: "Corsair Pro" },
    { id: 3, name: "Corsair Pro XS" },
    { id: 4, name: "Crusader" },
    { id: 5, name: "Caravel" },
    { id: 6, name: "Caravel" },
     ];

     IVUSList= [
      { id: 1, name: "60 MHz HD IVUS" },
      { id: 2, name: "45 MHz Refinity" },
      { id: 3, name: "40 MHz Opticross" },
    
       ];

       
      OCTList= [
        { id: 1, name: "Yes" },
        { id: 2, name: "No" },
      
         ];

         PhysiologytypeList= [
          { id: 1, name: "Dynamic" },
          { id: 2, name: "dFR" },
          { id: 3, name: "iFR" },
         
           ];

           PhysiologyvalueList= [
            { id: 1, name: "0.9" },
            { id: 2, name: "0.8" },
            { id: 3, name: "0.7" },
            { id: 4, name: "0.6" },
            { id: 5, name: "0.5" },
            
             ];

             LesionTypeList= [
              { id: 1, name: "Native Lesion"},
              { id: 2, name: "Graft"},
              { id: 3, name: "ISR" }
                          
               ];
    

  displayedColumns  = [
    'LVEF',
    'GLS',
    'RWMA',
    'PApressure',
    'Valve',
    'Stenotic',
    'Regurgitation',
    'MSAR',
    'MSAS',
    
    'action'
  ];

  dataSource = new MatTableDataSource<D2EchoDet>();


  
  displayedColumns1  = [
    'AccessType',
    'Accessvalue1',
    'Accessvalue2',
    'Other1',
    'IronDef',
    'USG',
    'Puncture',
    'Fluoro',
    'Device',
    
    'action'
  ];

  dataSource1 = new MatTableDataSource<AngioaccessType>();

    
  displayedColumns2  = [
    'LesionType',
    'Location',
    'SyntaxScore',
    'IndexLesion',
    'Severity',
    'Calcified',
    'Thrombus',
    'Proximal',
     'Branch',
    'action'
  ];

  dataSource2 = new MatTableDataSource<ProcedureType>();

    
  displayedColumns3 = [
    'Wiretype',
    'wireOther',
    'MicroCatheter',
    'Wire1Other',
    'action'
  ];

  dataSourc3 = new MatTableDataSource<WireType>();

  displayedColumns4 = [
    'IVUS',
    'OCT',
    'Imgothere',
    'action'
  ];

  dataSource4 = new MatTableDataSource<ImagingType>();

  displayedColumns5 = [
    'Physiologytype',
    'Physiologyvalue',
    'action'
  ];

  dataSource5 = new MatTableDataSource<PhysiologyType>();



  constructor(public _AppointmentService: AppointmentService,
    // public dialogRef: MatDialogRef<NewDocRegistrationComponent>,
    private accountService: AuthenticationService,
    private formBuilder: FormBuilder, public _matDialog: MatDialog,) { }

  ngOnInit(): void {
    this.personalFormGroup = this.createPesonalForm();
    this.searchFormGroup = this.createSearchForm();
    // this.accessFormGroup=this.createAccessForm();
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
    var m = {
      "PatientName": this.PatientName,
      "RegNo": this.RegNo,
      "MobileNo": this.Mobileno
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

  getProcedure() {

    var m = {
      "PatientName": this.PatientName,
      "RegNo": this.RegNo,
      "MobileNo": this.Mobileno
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

  onChangePageList(Id) {
    debugger
    console.log(Id)

    this.PatientHeaderObj['PatientName'] = this.PatientName;
    this.PatientHeaderObj['RegNo'] = this.RegNo;
    this.PatientHeaderObj['MobileNo'] = this.Mobileno;


    if (Id.id == 1) {
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
    } else if (Id.id == 2) {
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
    } else if (Id.id == 3) {
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
    } else if (Id.id == 5) {

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
    } else if (Id.id == 6) {

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
    else if (Id.id == 7) {

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
      PageId: [''],

      LVEF: [''],
      GLS: [''],
      RWMA: [''],
      PApressure: [''],
      Valve: [''],
      Stenotic: [''],
      Regurgitation: [''],
      MSAR: [''],
      MSAS: [''],

      LesionType:'',
      Location:'',
      SyntaxScore:'',
      IndexLesion:'',
      Severity:'',
      Calcified:'',
      Thrombus:[''],
      Proximal:[''],
      Branch:[''],
    
      AccessType:[''],
      Accessvalue1:[''],
      Accessvalue2:[''],
      Other1:[''],
      IronDef:[''],
      USG:[''],
      Puncture:[''],
      Fluoro:[''],
      Device:[''],


    Wiretype:'',
    wireOther:'',
    MicroCatheter:'',
    Wire1Other:'',

  IVUS:'',
  OCT:'',
  Imgothere:'',


  Physiologytype:'',
  Physiologyvalue:''
    });
  }

  // createAccessForm() {
  //   return this.formBuilder.group({
    

  //   });
  // }


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

  onAddData() {

        this.isLoading = 'save';
        this.dataSource.data = [];
      
        this.datalist.push(
          {
          
            LVEF:  this.personalFormGroup.get('LVEF').value || 0,
            GLS:this.personalFormGroup.get('GLS').value || 0,
            RWMA: this.personalFormGroup.get('RWMA').value.name || '',
            PApressure: this.personalFormGroup.get('PApressure').value.name || '',
            Valve: this.personalFormGroup.get('Valve').value.name || 0,
            Stenotic:this.personalFormGroup.get('Stenotic').value || 0,
            Regurgitation: this.personalFormGroup.get('Regurgitation').value || 0,
            MSAR: this.personalFormGroup.get('MSAR').value || 0,
            MSAS:this.personalFormGroup.get('MSAS').value || 0,
         
          });
        this.isLoading = '';
        this.dataSource.data = this.datalist;
        
      // }
  
    }

    onAddWiretypeData() {
    
    this.isLoading = 'save';
      
          this.dataSourc3.data = [];
        
          this.wiredatalist.push(
            {
            
              Wiretype:  this.personalFormGroup.get('Wiretype').value.name || '',
              wireOther:this.personalFormGroup.get('wireOther').value || '',
              MicroCatheter: this.personalFormGroup.get('MicroCatheter').value.name || '',
              Wire1Other: this.personalFormGroup.get('Wire1Other').value || '',
          
            });
          this.isLoading = '';
          this.dataSourc3.data = this.wiredatalist;
          
        // }
    
      }
   
      onAddImagingData() {
    
        this.isLoading = 'save';
          
              this.dataSource4.data = [];
            
              this.Imgimgdatalist.push(
                {
                
                  IVUS:  this.personalFormGroup.get('IVUS').value.name || '',
                  OCT:this.personalFormGroup.get('OCT').value.name || '',
                  Imgothere: this.personalFormGroup.get('Imgothere').value || '',
                               
                });
              this.isLoading = '';
              this.dataSource4.data = this.Imgimgdatalist;
              
            // }
        
          }

          onAddPhysiologyData() {
    
            this.isLoading = 'save';
              
                  this.dataSource5.data = [];
                
                  this.Physiodatalist.push(
                    {
                    
                      Physiologytype:  this.personalFormGroup.get('Physiologytype').value.name || '',
                      Physiologyvalue:this.personalFormGroup.get('Physiologyvalue').value.name || '',
                                                      
                    });
                  this.isLoading = '';
                  this.dataSource5.data = this.Physiodatalist;
                  
                // }
            
              }

    onAddProceduredata() {
     
          this.isLoading = 'save';
          this.dataSource2.data = [];
          debugger
          this.proceduredatalist.push(
            {
              
             LesionType:this.personalFormGroup.get('LesionType').value.name || '',
              Location:this.personalFormGroup.get('Location').value || '',
              SyntaxScore:this.personalFormGroup.get('SyntaxScore').value || 0,
              IndexLesion: this.personalFormGroup.get('IndexLesion').value || '',
              Severity: this.personalFormGroup.get('Severity').value.name || '',
              Calcified: this.personalFormGroup.get('Calcified').value.name || '',
              Thrombus:this.personalFormGroup.get('Thrombus').value || 'false',
              Proximal: this.personalFormGroup.get('Proximal').value || 'false',
              Branch: this.personalFormGroup.get('Branch').value || 'false',
             
           
            });
          this.isLoading = '';
          this.dataSource2.data = this.proceduredatalist;
          
        // }
    
      }


      onAddAccesstypeData() {

        debugger
      this.isLoading = 'save';
          // if ((this.InducibleTypeId  != null) && (this.InducibleTypeStatus !=null)) {
            if(this.personalFormGroup.get('AccessType').value ==1)
            {
              this.AccType='Arterial';
            }
            if(this.personalFormGroup.get('AccessType').value ==2)
            {
              this.AccType='Venous';
            }

            if(this.personalFormGroup.get('AccessType').value ==3)
            {
              this.AccType='Other';
            }


            this.isLoading = 'save';
            this.dataSource1.data = [];
          
            this.Accessdatalist.push(
              {
              
                AccessType:this.AccType || '',
                Accessvalue1:this.personalFormGroup.get('Accessvalue1').value.name || 0,
                Accessvalue2: this.personalFormGroup.get('Accessvalue2').value.name || '',
                Other1: this.personalFormGroup.get('Other1').value || '',
                IronDef: this.personalFormGroup.get('IronDef').value.name || '',
                USG:this.personalFormGroup.get('USG').value.name || '',
                Puncture: this.personalFormGroup.get('Puncture').value.name || '',
                Fluoro: this.personalFormGroup.get('Fluoro').value.name || '',
                Device:this.personalFormGroup.get('Device').value.name || '',
             
              });
            this.isLoading = '';
            this.dataSource1.data = this.Accessdatalist;
            
          // }
      
        }
  
}



export class D2EchoDet{
  LVEF: any;
  GLS: any;
  RWMA: any;
  PApressure: any;
  Valve: any;
  Stenotic: any;
  Regurgitation: any;
  MSAR: any;
  MSAS:any;
  constructor(D2EchoDet){
          this.LVEF = D2EchoDet.LVEF || '';
          this.GLS = D2EchoDet.GLS || '';
          this.RWMA = D2EchoDet.RWMA || '';
          this.PApressure = D2EchoDet.PApressure || '';
          this.Valve = D2EchoDet.Valve || '';
          this.Stenotic = D2EchoDet.Stenotic || '';
          this.Regurgitation = D2EchoDet.Regurgitation || '';
          this.MSAR = D2EchoDet.MSAR || '';
          this.MSAS = D2EchoDet.MSAS || '';
                 
  }
} 



export class AngioaccessType{
  AccessType: any;
  Accessvalue1: any;
  Accessvalue2: any;
  Other1: any;
  IronDef: any;
  USG: any;
  Puncture: any;
  Fluoro: any;
  Device:any;
  constructor(AngioaccessType){
          this.AccessType = AngioaccessType.AccessType || '';
          this.Accessvalue1 = AngioaccessType.Accessvalue1 || '';
          this.Accessvalue2 = AngioaccessType.Accessvalue2 || '';
          this.Other1 = AngioaccessType.Other1 || '';
          this.IronDef = AngioaccessType.IronDef || '';
          this.USG = AngioaccessType.USG || '';
          this.Puncture = AngioaccessType.Puncture || '';
          this.Fluoro = AngioaccessType.Fluoro || '';
          this.Device = AngioaccessType.Device || '';
                 
  }
} 


export class WireType{
  Wiretype: any;
  wireOther: any;
  MicroCatheter: any;
  Wire1Other: any;

  constructor(WireType){
          this.Wiretype = WireType.Wiretype || '';
          this.wireOther = WireType.wireOther || '';
          this.MicroCatheter = WireType.MicroCatheter || '';
          this.Wire1Other = WireType.Wire1Other || '';
         
  }
} 

export class ImagingType{
  IVUS: any;
  OCT: any;
  Imgothere: any;
  

  constructor(ImagingType){
          this.IVUS = ImagingType.IVUS || '';
          this.OCT = ImagingType.OCT || '';
          this.Imgothere = ImagingType.Imgothere || '';
                   
  }
}

export class PhysiologyType{
  Physiologytype: any;
  Physiologyvalue: any;
   

  constructor(PhysiologyType){
          this.Physiologytype = PhysiologyType.Physiologytype || '';
          this.Physiologyvalue = PhysiologyType.Physiologyvalue || '';
                             
  }
}  


 export class ProcedureType{
  LesionType:any;
  Location:any;
  SyntaxScore:any;
  IndexLesion:any;
  Severity:any;
  Calcified:any;
  Thrombus:any;
  Proximal:any;
  Branch:any;
  constructor(ProcedureType){
          this.LesionType = ProcedureType.LesionType || '';
          this.Location = ProcedureType.Location || '';
          this.SyntaxScore = ProcedureType.SyntaxScore || '';
          this.IndexLesion = ProcedureType.IndexLesion || '';
          this.Severity = ProcedureType.Severity || '';
          this.Calcified = ProcedureType.Calcified || '';
          this.Thrombus = ProcedureType.Thrombus || '';
          this.Proximal = ProcedureType.Proximal || '';
          this.Branch = ProcedureType.Branch || '';
                 
  }
} 