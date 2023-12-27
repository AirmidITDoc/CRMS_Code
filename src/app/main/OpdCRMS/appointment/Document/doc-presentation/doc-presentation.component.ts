import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { ClinicalDocumentService } from '../clinical-document.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doc-presentation',
  templateUrl: './doc-presentation.component.html',
  styleUrls: ['./doc-presentation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DocPresentationComponent implements OnInit {

  isCompanySelected: boolean = false;
  isNSTEMI: boolean = false;
  isSTEMI: boolean = false;
  isHemodynamics: boolean = false;
  isRaised: boolean = false;
  isNotRaised: boolean = false;
  isCTYes: boolean = false;

  subform: FormGroup;
  CADdivFormGroup: FormGroup;
  // toppings  = new FormControl('');
  UnstabletypeList: string[] = ['Hypotension <90 mmHg', 'Hypoxia', 'Tachy', 'Brady', 'ROSC'];
  StemitypeList: string[] = ['Anterior', 'Posterior', 'Lateral', 'Inferior'];
  AnginatypeList: string[] = ['No', 'Stable', 'Progressive'];
  // PositivetypeList:string[]=['Positive','Negative'];
  ScoretypeList: string[] = ['Critical', 'Significant', ' Not-Significant'];

  // InducibletypeList:string[]=['TMT','MPI','MRI Perfusion','Nuclear Scan','DSE'];

  InducibletypeList = [
    { id: 1, name: "No" },
    { id: 2, name: "TMT" },
    { id: 3, name: "MPI" },
    { id: 4, name: "MRI Perfusion" },
    { id: 5, name: "Nuclear Scan" },
    { id: 6, name: "DSE" }
  ];

  PositivetypeList = [
    { id: 1, name: "-- Select --" },
    { id: 2, name: "Positive" },
    { id: 3, name: "Negative" },

  ];
  


  countryList: any = [];

  Stemidiv: boolean = true;
  Stablecorsyndiv: boolean = false;
  Hemodynamicdiv: boolean = false;
  Hemodynamicunstablediv: boolean = false;
  BookAppointment: boolean = true;
  CADdiv: boolean = false;
  HeartFailure: boolean = true;

  datalist: any = [];
  isLoading: any;
  InducibleTypeId: any;
  InducibleTypeStatus: any;

  displayedColumns = [
    'InducibleTypeId',
    'InducibleTypeStatus',
    'action'
  ];

  dataSource = new MatTableDataSource<InducibleIschemiaDet>();


  type: any = 0;
  Appoinment:any;
  screenFromString = 'admission-form';
  registerObj: any;
  ActCorSyndromediv: boolean = false;
  regobj: any;
  PatientName: any;
  RegNo: any;
  MobileNo: any;

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DocPresentationComponent>,
    private _loggedService: AuthenticationService,
    public _ClinicalDocumentService: ClinicalDocumentService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.subform = this.SubForm();
    this.CADdivFormGroup = this.createCADdivForm();


    // debugger
    this.registerObj = this.data;
    this.type = this.data.DoctypeId;
    
    if (this.data) {
      this.regobj = this.data.advanceObj;
      this.PatientName = this.regobj.PatientName;
      this.RegNo = this.regobj.RegNo;
      //this.MobileNo = this.regobj.MobileNo;

    }

    if (this.type == 1) {
      this.ActCorSyndromediv = true
    }
    if (this.type == 2) {
      this.Stablecorsyndiv = true
    }
    if (this.type == 3) {
      this.CADdiv = true
    }
    if (this.Appoinment == 4) {
      this.BookAppointment = true
    }
    if (this.type == 43) {
      this.HeartFailure = true
    }
  }

  onChangeStemiYN(event){
    if (event.value == 'STEMI') {
      //alert(event.value);
        this.isSTEMI =true;
        this.isNSTEMI =false;
    }
    else if (event.value == 'NSTEMI') {
      this.isNSTEMI =true;       
      this.isSTEMI =false;
    }
    else{
      this.isNSTEMI =false;
      this.isSTEMI =false;
    }      
  }
  
  onChangeEnzyme(event){
    if (event.value == 'Raised') {
      //alert(event.value);
        this.isRaised =true;
        this.isNotRaised =false;
    }
    else if (event.value == 'NotRaised') {
      this.isNotRaised =true;       
      this.isRaised =false;
    }
    else{
      this.isNotRaised =false;
      this.isRaised =false;
    }      
  }


  onChangeCT(event){
    if (event.value == 'Yes') {
        this.isCTYes =true;
    }
    else if (event.value == 'No') {
      this.isCTYes =false;
    }
    else{
      this.isCTYes =false;
    }      
  }

  








  SubForm() {
    return this._formBuilder.group({
      Stemi: ['true'],
      Nstemi: ['false'],
      Cppresentation: ['0'],
      Cppresentationduration: [''],

      Hemodynamic: ['true'],
      Hemodynamicstatus: ['0'],
      Hemodynamicstatus1: ['stable'],
      StemiTypeId: [''],
      SemiOther: '',

      //SVGAElementtablestatus: [''],
      Hypertension: ['ture'],
      Hypoxia: ['ture'],
      Tachy: ['ture'],
      Brady: ['ture'],
      Rosc: ['ture'],

      EKGChanges: '',
      Enzyme: ['true'],
      Other1: [''],


      //Angnia: ['true'],

      Induciblestatus: '',
      Angniastatus: ['1'],
      Condtionstatus: [''],
      InducibleTypeId: ['1'],
      InducibleTypeStatus: ['1'],

      // TypeofCAD: '',
      // Routine: ['1'],
      // CalciumScore: ['1'],

      // CalciumScorestatus: '',
      // Score: ['1'],
      // Other3: ['1'],

      // CTType: ['1'],

      // Echo: '',
      // LVEF: ['1'],
      // GLS: ['1'],
      // RWMA: ['1'],
      // LVEFType: ['1'],

    });
  }

  onChangeStemi($event) {
    debugger
    console.log($event.value);
    if ($event.source.name === "Stemi") {
      this.Stemidiv = false
    } else {
      this.Stemidiv = true
    }
  }
  
  onChangeHemodynamic($event) {
    debugger
    console.log($event.value);
    if ($event.source.name === "Stemi") {
      this.Hemodynamicdiv = false
    } else {
      this.Hemodynamicdiv = true
    }
  }

  onChangeHemodynamicstatus1($event) {
    debugger
    if ($event.source.name === "stable") {
      this.Hemodynamicdiv = false
    } else {
      this.Hemodynamicunstablediv = true
    }
  }

  onChangeType(Id) {
    debugger
    this.InducibleTypeId = Id.name;
  }

  onChangeTypestatus(Id) {
    this.InducibleTypeStatus = Id.name;
  }

  onAddData() {
    this.isLoading = 'save';
    if ((this.InducibleTypeId != null) && (this.InducibleTypeStatus != null)) {
      this.isLoading = 'save';
      this.dataSource.data = [];
      this.datalist.push(
        {
          InducibleTypeId: this.InducibleTypeId || 0,
          InducibleTypeStatus: this.InducibleTypeStatus || 0
        });
      this.isLoading = '';
      this.dataSource.data = this.datalist;
    }
     
  }
  deleteTableRow(event, element) {
    // if (this.key == "Delete") {
      let index = this.datalist.indexOf(element);
      if (index >= 0) {
        this.datalist.splice(index, 1);
        this.dataSource.data = [];
        this.dataSource.data = this.datalist;
      }
      Swal.fire('Success !', 'Patient2DEcho Row Deleted Successfully', 'success');
  }

  onChangeInducibleTypeStatus() {

  }
  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    // console.log('dateTimeObj==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

  onClose() {
    this.dialogRef.close();
  }
  createCADdivForm() {
    return this._formBuilder.group({
      CT: '',
      Calcium: '',
      Severity: '',
      Other: ''
    })
  }    
  OnSaveAcute() {
    this.isLoading = 'submit';
    let submissionObj = {};
    let saveAcsPatientDetails = {};

    saveAcsPatientDetails['acsPatientId'] = 0;
    saveAcsPatientDetails['patientId'] = this.RegNo;
    saveAcsPatientDetails['visitId'] = 0;
    saveAcsPatientDetails['acsType'] = this.subform.get('StemiTypeId').value;
    saveAcsPatientDetails['cpPresentation'] = this.subform.get('Cppresentation').value;
    saveAcsPatientDetails['hemodynamics'] = this.subform.get('Hemodynamic').value;
    saveAcsPatientDetails['hypotension'] = this.subform.get('Hypertension').value;
    saveAcsPatientDetails['tachy'] = this.subform.get('Tachy').value;
    saveAcsPatientDetails['brady'] = this.subform.get('Brady').value;
    saveAcsPatientDetails['rosc'] = this.subform.get('Rosc').value;
    saveAcsPatientDetails['anatomicalPosition'] = 0;// this.subform.get('CABG').value;
    saveAcsPatientDetails['stemiOther'] = this.subform.get('SemiOther').value;
    saveAcsPatientDetails['ekgChange'] = this.subform.get('EKGChanges').value;
    saveAcsPatientDetails['enzymeRaised'] = this.subform.get('Enzyme').value;
    saveAcsPatientDetails['other'] = this.subform.get('Other1').value;
    saveAcsPatientDetails['nstemiOther'] = this.subform.get('SemiOther').value;
    saveAcsPatientDetails['createdBy'] = this._loggedService.currentUserValue.user.id;

    submissionObj['saveAcsPatientDetails'] = saveAcsPatientDetails;

    console.log(submissionObj);
    this._ClinicalDocumentService.SaveAcuteCorSyndrome(submissionObj).subscribe(response => {
      console.log(response);
      if (response) {
        Swal.fire('Congratulations !', 'Acute Coronary Syndrome Saved Successfully  !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Acute Coronary Syndrome Not Updated', 'error');
      }
      this.isLoading = '';
    }, error => {
      Swal.fire('Data not saved !, Please check API error..', 'Error !')
      // this.snackBarService.showErrorSnackBar('Sales data not saved !, Please check API error..', 'Error !');
    });

  }
 
  OnSaveStable() {
    this.isLoading = 'submit';
    let submissionObj = {};
    let saveScsPatientDetails = {};

    saveScsPatientDetails['scsPatientId'] = 0;
    saveScsPatientDetails['patientId'] = this.RegNo;
    saveScsPatientDetails['visitId'] = 0;
    saveScsPatientDetails['symtomTypeId'] =0; //this.data.DropDownId;
    saveScsPatientDetails['angina'] = this.subform.get('Condtionstatus').value;
    saveScsPatientDetails['inducibleIschemia'] = this.subform.get('InducibleTypeId').value.id;
    saveScsPatientDetails['inducibleIschemiaResult'] = this.subform.get('InducibleTypeStatus').value.name;
    saveScsPatientDetails['createdBy'] = this._loggedService.currentUserValue.user.id;

    submissionObj['saveScsPatientDetails'] = saveScsPatientDetails;

    console.log(submissionObj);
    this._ClinicalDocumentService.SaveStableCoronary(submissionObj).subscribe(response => {
      console.log(response);
      if (response) {
        Swal.fire('Congratulations !', 'Stable Coronary Syndrome Saved Successfully  !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Stable Coronary Syndrome Not Updated', 'error');
      }
      this.isLoading = '';
    }, error => {
      Swal.fire('Data not saved !, Please check API error..', 'Error !')
      // this.snackBarService.showErrorSnackBar('Sales data not saved !, Please check API error..', 'Error !');
    });

  }
  
  OnSaveDetCad() {
    this.isLoading = 'submit';
    let submissionObj = {};
    let saveIdcadPatientDetails = {};

    saveIdcadPatientDetails['idcadPatientId'] = 0;
    saveIdcadPatientDetails['patientId'] = this.RegNo;
    saveIdcadPatientDetails['visitId'] = 0;
    saveIdcadPatientDetails['symtomTypeId'] =0;//this.data.DropDownId;
    saveIdcadPatientDetails['ct'] = this.CADdivFormGroup.get('CT').value;
    saveIdcadPatientDetails['calciumScore'] = this.CADdivFormGroup.get('Calcium').value;
    saveIdcadPatientDetails['idcadOther'] = this.CADdivFormGroup.get('Other').value;
    saveIdcadPatientDetails['createdBy'] = this._loggedService.currentUserValue.user.id;

    submissionObj['saveIdcadPatientDetails'] = saveIdcadPatientDetails;

    console.log(submissionObj);
    this._ClinicalDocumentService.SaveIdcadPatient(submissionObj).subscribe(response => {
      console.log(response);
      if (response) {
        Swal.fire('Congratulations !', 'Idcad Patient Details Saved Successfully  !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Idcad Patient Details Not Updated', 'error');
      }
      this.isLoading = '';
    }, error => {
      Swal.fire('Data not saved !, Please check API error..', 'Error !')
      // this.snackBarService.showErrorSnackBar('Sales data not saved !, Please check API error..', 'Error !');
    });

  }
}


export class InducibleIschemiaDet {
  InducibleTypeId: any;
  InducibleTypeStatus: any;

  constructor(InducibleIschemiaDet) {

    this.InducibleTypeId = InducibleIschemiaDet.InducibleTypeId || '';
    this.InducibleTypeStatus = InducibleIschemiaDet.InducibleTypeStatus || '';

  }
} 