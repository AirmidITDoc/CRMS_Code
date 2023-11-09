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
import { ClinicalDocumentService } from '../clinical-document.service';

@Component({
  selector: 'app-new-doc-registration',
  templateUrl: './new-doc-registration.component.html',
  styleUrls: ['./new-doc-registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewDocRegistrationComponent implements OnInit {
  newSearchForm: FormGroup;
  CardiacRiskFormGroup: FormGroup;
  newAddForm: FormGroup;
  newSaveForm:FormGroup;
  ProcedureForm:FormGroup;
  AngioplastyFormGroup:FormGroup;
  WireTypeFormGroup:FormGroup;
  ImagingFormGroup:FormGroup;
  PhysiologyFormGroup:FormGroup;
  personalFormGroup: FormGroup;

  filteredOptions: any;
  noOptionFound: boolean = false;
  PatientListfilteredOptions
  registerObj = new RegInsert({});
  submitted = false;
  isLoading: any;
  screenFromString = 'admission-form';
  RegId: any;
  PatientName: any = '';
  Mobileno: any = '';
  isRegIdSelected: boolean = false;
  RegNo: any;
  PatientId:any;

  isPrefixSelected: boolean = false;
  optionsPrefix: any[] = [];
  filteredOptionsPrefix: Observable<string[]>;
  PrefixList: any = [];
  GenderList: any = [];
  selectedGenderID: any;
 
  PatientHeaderObj = {};

  datalist: any = [];
  Accessdatalist: any = [];
  proceduredatalist: any = [];
  wiredatalist: any = [];
  Imgimgdatalist: any = [];
  Physiodatalist: any = [];

  AccType: any;
  InducibleTypeId: any;
  InducibleTypeStatus: any;

  vSymtomType: any = [];
  vRWMAList: any = [];
  vLesionTypeList: any = [];
  vLesionSeverityList: any = [];
  vLesionCalcifiedList: any = [];
  vInflammatoryDiseasesList: any = [];



  //   { id: 1, name: "Acute Coronary Syndrome" },
  //   { id: 2, name: "Stable Coronary Syndrome" },
  //   { id: 3, name: "Incidental / Detection of CAD" },
  //   // {id: 4, name: "Brazil"},
  //   // {id: 5, name: "England"}
  // ];

  Pagestype = [
    { id: 1, name: "Book Patient Appointment" },
    { id: 2, name: "Procedure Hemodynamics" },
    { id: 3, name: "Demographic" },
    { id: 4, name: "Anjioplasti" },
    { id: 5, name: "Lesion Preapration" },
    { id: 6, name: "DocPresentationComponent" },
    { id: 7, name: "Result" }
  ];

  // RWMAList = [
  //   { id: 1, name: "Anterior" },
  //   { id: 2, name: "Posterior" },
  //   { id: 3, name: "Lateral" },
  //   { id: 4, name: "Inferior" },
  //   { id: 5, name: "Apical Preapration" },

  // ];
  PApressureList = [
    { id: 1, name: "Normal" },
    { id: 2, name: "Raised" }
  ]
  ValveList = [
    { id: 1, name: "Mitral" },
    { id: 2, name: "Aortic" },
  ]

  // SeverityList = [
  //   { id: 1, name: "100%" },
  //   { id: 2, name: "Critical (80-99%)" },
  //   { id: 3, name: "Significant (Non-Critical 70-80%)" },
  //   { id: 4, name: "Intermediate (50-70%)" },
  //   { id: 5, name: "Not Significant (50%) " },
  // ];

  Accessvalue1List = [
    { id: 1, name: "Femoral" },
    { id: 2, name: "Radial" },

  ];
  Accessvalue2List = [
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

  // CalcifiedList = [
  //   { id: 1, name: "Pace Wire" },
  //   { id: 2, name: "Impella" },
  //   { id: 3, name: "IABP" },
  //   { id: 4, name: "Guide Catheter" },
  //   { id: 5, name: "Vanous Access" },

  // ];


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
  MicroCatheterList = [
    { id: 1, name: "Finecross" },
    { id: 2, name: "Corsair Pro" },
    { id: 3, name: "Corsair Pro XS" },
    { id: 4, name: "Crusader" },
    { id: 5, name: "Caravel" },
    { id: 6, name: "Caravel" },
  ];

  IVUSList = [
    { id: 1, name: "60 MHz HD IVUS" },
    { id: 2, name: "45 MHz Refinity" },
    { id: 3, name: "40 MHz Opticross" },

  ];


  OCTList = [
    { id: 1, name: "Yes" },
    { id: 2, name: "No" },

  ];

  PhysiologytypeList = [
    { id: 1, name: "Dynamic" },
    { id: 2, name: "dFR" },
    { id: 3, name: "iFR" },

  ];

  PhysiologyvalueList = [
    { id: 1, name: "0.9" },
    { id: 2, name: "0.8" },
    { id: 3, name: "0.7" },
    { id: 4, name: "0.6" },
    { id: 5, name: "0.5" },

  ];

  //  LesionTypeList= [
  //   { id: 1, name: "Native Lesion"},
  //   { id: 2, name: "Graft"},
  //   { id: 3, name: "ISR" }

  //    ];


  displayedColumns = [
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
  displayedColumns1 = [
    'AccessType',
    'Accessvalue1',
    'Accessvalue2',
    'Other1',
    // 'IronDef',
    'USG',
    'Puncture',
    'Fluoro',
    'Device',
    'action'
  ];

  dataSource1 = new MatTableDataSource<AngioaccessType>();
  displayedColumns2 = [
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
    private _loggedService: AuthenticationService,
    public _ClinicalDocumentService: ClinicalDocumentService,
    private formBuilder: FormBuilder, public _matDialog: MatDialog,) { }

  ngOnInit(): void {
    this.personalFormGroup = this.createPesonalForm();
     this.newSearchForm = this.createSearchForm();
    this.newAddForm = this.createAddForm();
    this.newSaveForm= this.createSaveForm();
    this.CardiacRiskFormGroup=this.createCardiacRiskGroup();
    this.ProcedureForm= this.createProcedureForm();
    this.AngioplastyFormGroup = this.createAngioplastyForm();
    this.WireTypeFormGroup =this.createWireTypeForm();
    this.ImagingFormGroup = this.createImagingForm();
    this.PhysiologyFormGroup=this.createPhysiologyForm();
    // this.getPrefixList();
    this.getvSymtomTypeList();
    this.getvRWMAList();
    this.getvLesionTypeList();
    this.getvLesionSeverityList();
    this.getvLesionCalcifiedList();
    this.getvInflammatoryDiseasesList();
  }
  getvSymtomTypeList() {
    var vadata = {
      'DropDownType': 'SymtomType'
    }
    this._ClinicalDocumentService.getDropDownList(vadata).subscribe(data => {
      this.vSymtomType = data
       console.log(this.vSymtomType);
    })
  }
  getvRWMAList() {
    var vadata = {
      'DropDownType': 'RWMA'
    }
    this._ClinicalDocumentService.getDropDownList(vadata).subscribe(data => {
      this.vRWMAList = data
      //console.log(this.vRWMAList);
    })
  }
  getvLesionTypeList() {
    var vadata = {
      'DropDownType': 'LesionType'
    }
    this._ClinicalDocumentService.getDropDownList(vadata).subscribe(data => {
      this.vLesionTypeList = data
      // console.log(this.vLesionTypeList);
    })
  }
  getvLesionSeverityList() {
    var vadata = {
      'DropDownType': 'LesionSeverity'
    }
    this._ClinicalDocumentService.getDropDownList(vadata).subscribe(data => {
      this.vLesionSeverityList = data
      // console.log(this.vLesionSeverityList);
    })
  }
  getvLesionCalcifiedList() {
    var vadata = {
      'DropDownType': 'LesionCalcified'
    }
    this._ClinicalDocumentService.getDropDownList(vadata).subscribe(data => {
      this.vLesionCalcifiedList = data
     // console.log(this.vLesionCalcifiedList);
    })
  }
  getvInflammatoryDiseasesList() {
    var vadata = {
      'DropDownType': 'Inflammatory Diseases'
    }
   // console.log(vadata);
    this._ClinicalDocumentService.getDropDownList(vadata).subscribe(data => {
      this.vInflammatoryDiseasesList = data
      //console.log(this.vInflammatoryDiseasesList);
    })
  }
  createAddForm() {
    return this.formBuilder.group({
      Symtoms:'',
      LVEF: [''],
      GLS: [''],
      RWMA: [''],
      PApressure: [''],
      Valve: [''],
      Stenotic: [''],
      Regurgitation: [''],
      MSAR: [''],
      MSAS: ['']
    })
  }
  onAddData() {
    this.isLoading = 'save';
    this.dataSource.data = [];
    this.datalist.push(
      {
        LVEF: this.newAddForm.get('LVEF').value || 0,
        GLS: this.newAddForm.get('GLS').value || 0,
        RWMA: this.newAddForm.get('RWMA').value.name || '',
        PApressure: this.newAddForm.get('PApressure').value.name || '',
        Valve: this.newAddForm.get('Valve').value.name || 0,
        Stenotic: this.newAddForm.get('Stenotic').value || 0,
        Regurgitation: this.newAddForm.get('Regurgitation').value || 0,
        MSAR: this.newAddForm.get('MSAR').value || 0,
        MSAS: this.newAddForm.get('MSAS').value || 0,
      });
    this.isLoading = '';
    this.dataSource.data = this.datalist;
    this.Save2DEchoDetailes();
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
  Save2DEchoDetailes(){
    this.isLoading = 'submit';
    let submissionObj = {};
    let savePatient2DEchoDetail= {};

    savePatient2DEchoDetail['patient2DEchoId']  =  0;
    savePatient2DEchoDetail['patientId']  = this.RegNo;
    savePatient2DEchoDetail['visitId']  = 0;
    savePatient2DEchoDetail['lvef']  = this.newAddForm.get('LVEF').value;
    savePatient2DEchoDetail['globalGLS']  =this.newAddForm.get('GLS').value;
    savePatient2DEchoDetail['rwma']  = 0;//this.newAddForm.get('RWMA').value;
    savePatient2DEchoDetail['valve']  = this.newAddForm.get('Valve').value.name;
    savePatient2DEchoDetail['stenotic']  =this.newAddForm.get('Stenotic').value;
    savePatient2DEchoDetail['regurgitation']  = this.newAddForm.get('Regurgitation').value;
    savePatient2DEchoDetail['mrar']  = this.newAddForm.get('MSAR').value;
    savePatient2DEchoDetail['msas']  = this.newAddForm.get('MSAS').value;
    savePatient2DEchoDetail['createdBy']  = this._loggedService.currentUserValue.user.id;

    submissionObj['savePatient2DEchoDetails'] = savePatient2DEchoDetail;
    
    console.log(submissionObj);
    this._ClinicalDocumentService.SavePatient2DEchoDet(submissionObj).subscribe(response => {
      console.log(response);
      if (response) {
        Swal.fire('Congratulations !', 'Patient 2DEchoDetaile Add & Saved Successfully  !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Patient 2DEcho Detaile Not Updated', 'error');
      }
      this.isLoading = '';
    });
  }
  createSearchForm(){
    return this.formBuilder.group({
      RegID: ['']
    })
  }
  getSearchList() {
    var m_data = {
      "Keyword": `${this.newSearchForm.get('RegID').value}%`
    }
    if (this.newSearchForm.get('RegID').value.length >= 1) {
      this._ClinicalDocumentService.getSearchPatientInformList(m_data).subscribe(resData => {
        this.filteredOptions = resData;
        console.log(resData);
        this.PatientListfilteredOptions = resData;
        if (this.filteredOptions.length == 0) {
          this.noOptionFound = true;
        } else {
          this.noOptionFound = false;
        }
      });
    }
  }
  getOptionText(option) {
    if (!option) return '';
    return option.FirstName + ' ' + option.LastName + ' (' + option.RegId + ')';
  }
  getSelectedObj(obj) {
    // debugger
    this.registerObj = obj;
    console.log(obj);
    this.PatientName = this.registerObj.FirstName + ' ' + this.registerObj.MiddleName + ' ' + this.registerObj.LastName;
    this.RegNo= this.registerObj.PatientId;
  }
  createSaveForm(){
    return this.formBuilder.group({
      PastCardiacProcedure:'',
      VascularProcedure:'',
      CABG:'',
      Angioplasty:'',
      PastNonCardiacProcedure:''
    })
  } 
  onSubmit() {
    this.isLoading = 'submit';
      let submissionObj = {};
      let savePatientPastHistorys= {};

      savePatientPastHistorys['pastHistoryId']  =  0;
      savePatientPastHistorys['patientId']  = this.RegNo;
      savePatientPastHistorys['visitId']  = 0;
      savePatientPastHistorys['angioplasty']  = this.newSaveForm.get('Angioplasty').value;
      savePatientPastHistorys['cabg']  = this.newSaveForm.get('CABG').value;
      savePatientPastHistorys['vascularProcedure']  = this.newSaveForm.get('VascularProcedure').value;
      savePatientPastHistorys['createdBy']  =this._loggedService.currentUserValue.user.id;

      submissionObj['savePatientPastHistory'] = savePatientPastHistorys;
      
      console.log(submissionObj);
      this._ClinicalDocumentService.SavePatientPastHistory(submissionObj).subscribe(response => {
        console.log(response);
        if (response) {
          Swal.fire('Congratulations !', 'Patient past History Saved Successfully  !', 'success').then((result) => {
            if (result.isConfirmed) {
              this._matDialog.closeAll();
            }
          });
        } else {
          Swal.fire('Error !', 'Patient past History Not Updated', 'error');
        }
        this.isLoading = '';
      });
    }
// Cardiac Risk Factore
    createCardiacRiskGroup(){
      return this.formBuilder.group({
        OnMedication:'',
        DrugDetails:'',
        CKD:'',
        DialysisDependent:'',
        Smoking:'',
        TobacoChewing:'',
        Insuline:'',
        Oral:'',
        LDL:'',
        TriGlyceride:'',
        InflammatoryDiseases:'',
        inflDiseasesOthers:'',
        Hba1c:'',
        Creatinine:'',
        Hb:'',
        eGFR:'',
        IronDeficency:'',
        VitB12Dificency:'',
        cRP:'',
        CKMB:''
      })
    }
    onSubmitCardiac(){
      this.isLoading = 'submit';
      let submissionObj = {};
      let saveCardiacRiskFactors= {};

      saveCardiacRiskFactors['crfId']  =  0;
      saveCardiacRiskFactors['patientId']  = this.RegNo;
      saveCardiacRiskFactors['visitId']  = 0;
      saveCardiacRiskFactors['hypertension']  = '';
      saveCardiacRiskFactors['onMedication']  = this.CardiacRiskFormGroup.get('OnMedication').value;
      saveCardiacRiskFactors['drugDetails']  = this.CardiacRiskFormGroup.get('DrugDetails').value;
      saveCardiacRiskFactors['ckd']  = this.CardiacRiskFormGroup.get('CKD').value;
      saveCardiacRiskFactors['dialysisDependent']  = this.CardiacRiskFormGroup.get('DialysisDependent').value;
      saveCardiacRiskFactors['t2DInsuline']  = this.CardiacRiskFormGroup.get('Insuline').value;
      saveCardiacRiskFactors['t2DOral']  = this.CardiacRiskFormGroup.get('Oral').value;
      saveCardiacRiskFactors['smoking']  =  this.CardiacRiskFormGroup.get('Smoking').value;
      saveCardiacRiskFactors['tobaccoChew']  =this.CardiacRiskFormGroup.get('TobacoChewing').value;
      saveCardiacRiskFactors['dyLDL']  = this.CardiacRiskFormGroup.get('LDL').value;
      saveCardiacRiskFactors['dyTriGlyceride']  = this.CardiacRiskFormGroup.get('TriGlyceride').value;
      saveCardiacRiskFactors['inflDiseases']  = 0;// this.CardiacRiskFormGroup.get('InflammatoryDiseases').value;
      saveCardiacRiskFactors['inflDiseasesOthers']  = this.CardiacRiskFormGroup.get('inflDiseasesOthers').value;
      saveCardiacRiskFactors['ltHba1c']  =  this.CardiacRiskFormGroup.get('Hba1c').value;
      saveCardiacRiskFactors['ltCreatinine']  = this.CardiacRiskFormGroup.get('Creatinine').value;
      saveCardiacRiskFactors['ltHb']  =this.CardiacRiskFormGroup.get('Hb').value;
      saveCardiacRiskFactors['lTeGFR']  = this.CardiacRiskFormGroup.get('eGFR').value;
      saveCardiacRiskFactors['ltIronDeficency']  = this.CardiacRiskFormGroup.get('IronDeficency').value;
      saveCardiacRiskFactors['ltVitB12Dif']  = this.CardiacRiskFormGroup.get('VitB12Dificency').value;
      saveCardiacRiskFactors['lTcRP']  = this.CardiacRiskFormGroup.get('cRP').value;
      saveCardiacRiskFactors['ltckmb']  = this.CardiacRiskFormGroup.get('CKMB').value;
      saveCardiacRiskFactors['createdBy']  =this._loggedService.currentUserValue.user.id;

      submissionObj['saveCardiacRiskFactor'] = saveCardiacRiskFactors;
      
      console.log(submissionObj);
      this._ClinicalDocumentService.SaveCardiacRiskFactor(submissionObj).subscribe(response => {
        console.log(response);
        if (response) {
          Swal.fire('Congratulations !', 'Cardiac Risk Factor Saved Successfully  !', 'success').then((result) => {
            if (result.isConfirmed) {
              this._matDialog.closeAll();
            }
          });
        } else {
          Swal.fire('Error !', 'Cardiac Risk Factor Not Updated', 'error');
        }
        this.isLoading = '';
      });

    }

    // Procedure Tab 
    createProcedureForm(){
      return this.formBuilder.group({
        Systolic:'',
        Diastolic:'',
        MAP:'',
        LVEDP:'',
        PSystolic:'',
        PDiastolic:'',
        PMap:'',
        PCWP:'',
        LesionType:'',
        Location:'',
        SyntaxScore:'',
        IndexLesion:'',
        Severity:'',
        Calcified:'',
        Thrombus:'',
        Proximal:'',
        Branch:''
      })
    }
    
    onAddProceduredata() {
      this.isLoading = 'save';
      this.dataSource2.data = [];
      this.proceduredatalist.push(
        {
          LesionType: this.ProcedureForm.get('LesionType').value.DropDownValue || '',
          Location: this.ProcedureForm.get('Location').value || '',
          SyntaxScore: this.ProcedureForm.get('SyntaxScore').value || 0,
          IndexLesion: this.ProcedureForm.get('IndexLesion').value || '',
          Severity: this.ProcedureForm.get('Severity').value.DropDownValue || '',
          Calcified: this.ProcedureForm.get('Calcified').value.DropDownValue || '',
          Thrombus: this.ProcedureForm.get('Thrombus').value || 'false',
          Proximal: this.ProcedureForm.get('Proximal').value || 'false',
          Branch: this.ProcedureForm.get('Branch').value || 'false',
        });
      this.isLoading = '';
      this.dataSource2.data = this.proceduredatalist;
      this. SaveLesion();
    }
    deleteTableRowProcedure(event, element) {
      // if (this.key == "Delete") {
        let index = this.proceduredatalist.indexOf(element);
        if (index >= 0) {
          this.proceduredatalist.splice(index, 1);
          this.dataSource2.data = [];
          this.dataSource2.data = this.proceduredatalist;
        }
        Swal.fire('Success !', 'Lesion Row Deleted Successfully', 'success');
    }
      SaveLesion(){
      this.isLoading = 'submit';
      let submissionObj = {};
      let saveLesionDetail= {};

      saveLesionDetail['lesionId']  =  0;
      saveLesionDetail['patientId']  = this.RegNo;
      saveLesionDetail['visitId']  = 0;
      saveLesionDetail['procedureId']  = 0;
      saveLesionDetail['lesionType']  = this.ProcedureForm.get('LesionType').value.DropDownValue;
      saveLesionDetail['location']  = this.ProcedureForm.get('Location').value;
      saveLesionDetail['syntaxScore']  = this.ProcedureForm.get('SyntaxScore').value;
      saveLesionDetail['indexLesion']  = this.ProcedureForm.get('IndexLesion').value;
      saveLesionDetail['lesionSeverity']  = this.ProcedureForm.get('Severity').value.DropDownValue;
      saveLesionDetail['lesionDevice']  = '';
      saveLesionDetail['calcified']  = this.ProcedureForm.get('Calcified').value.DropDownValue;
      saveLesionDetail['thrombus']  = this.ProcedureForm.get('Thrombus').value;
      saveLesionDetail['proximalTortuosity']  = this.ProcedureForm.get('Proximal').value;
      saveLesionDetail['impSideBranch']  = this.ProcedureForm.get('Branch').value;
      saveLesionDetail['createdBy']  =this._loggedService.currentUserValue.user.id;

      submissionObj['saveLesionDetails'] = saveLesionDetail;
      
      console.log(submissionObj);
      this._ClinicalDocumentService.SaveLesionDetails(submissionObj).subscribe(response => {
        console.log(response);
        if (response) {
          Swal.fire('Congratulations !', 'Lesion Details Saved Successfully  !', 'success').then((result) => {
            if (result.isConfirmed) {
              this._matDialog.closeAll();
            }
          });
        } else {
          Swal.fire('Error !', 'Lesion Details Not Updated', 'error');
        }
        this.isLoading = '';
      });
      }

    onSubmitProcedure(){
      this.isLoading = 'submit';
      let submissionObj = {};
      let saveProcedureDetail= {};

      saveProcedureDetail['procedureId']  =  0;
      saveProcedureDetail['patientId']  = this.RegNo;
      saveProcedureDetail['visitId']  = 0;
      saveProcedureDetail['aortogramSystolic']  =  this.ProcedureForm.get('Systolic').value;
      saveProcedureDetail['aortogramDiastolic']  = this.ProcedureForm.get('Diastolic').value;
      saveProcedureDetail['aortogramMAP']  = this.ProcedureForm.get('MAP').value;
      saveProcedureDetail['lvedp']  = this.ProcedureForm.get('LVEDP').value;
      saveProcedureDetail['paSystolic']  = this.ProcedureForm.get('PSystolic').value;
      saveProcedureDetail['paDiastolic']  = this.ProcedureForm.get('PDiastolic').value;
      saveProcedureDetail['pamap']  = this.ProcedureForm.get('PMap').value;
      saveProcedureDetail['papcwp']  = this.ProcedureForm.get('PCWP').value;
      saveProcedureDetail['createdBy']  =this._loggedService.currentUserValue.user.id;

      submissionObj['saveProcedureDetails'] = saveProcedureDetail;
      
      console.log(submissionObj);
      this._ClinicalDocumentService.SaveProcedureDetails(submissionObj).subscribe(response => {
        console.log(response);
        if (response) {
          Swal.fire('Congratulations !', 'Procedure Saved Successfully  !', 'success').then((result) => {
            if (result.isConfirmed) {
              this._matDialog.closeAll();
            }
          });
        } else {
          Swal.fire('Error !', 'Procedure Not Updated', 'error');
        }
        this.isLoading = '';
      });

    }
  
  // Agnioplasty Tab 
  createAngioplastyForm(){
    return this.formBuilder.group({
      NumberofAccess:'',
      AccessType:'',
      Accessvalue1:'',
      Accessvalue2:'',
      AccessvalueOther:'',
      USG:'',
      Puncture:'',
      Fluoro:'',
      Device:''
    })
  }
  onAddAccesstypeData() {
    // debugger
    this.isLoading = 'save';
    if (this.AngioplastyFormGroup.get('AccessType').value == 1) {
      this.AccType = 'Arterial';
    }
    if (this.AngioplastyFormGroup.get('AccessType').value == 2) {
      this.AccType = 'Venous';
    }

    if (this.AngioplastyFormGroup.get('AccessType').value == 3) {
      this.AccType = 'Other';
    }
    this.isLoading = 'save';
    this.dataSource1.data = [];
    this.Accessdatalist.push(
      {
        AccessType: this.AccType || '',
        Accessvalue1: this.AngioplastyFormGroup.get('Accessvalue1').value.name || 0,
        Accessvalue2: this.AngioplastyFormGroup.get('Accessvalue2').value.name || '',
        Other1: this.AngioplastyFormGroup.get('AccessvalueOther').value || '',
       // IronDef: this.AccessFormGroup.get('IronDef').value.name || '',
        USG: this.AngioplastyFormGroup.get('USG').value.name || '',
        Puncture: this.AngioplastyFormGroup.get('Puncture').value.name || '',
        Fluoro: this.AngioplastyFormGroup.get('Fluoro').value.name || '',
        Device: this.AngioplastyFormGroup.get('Device').value.name || '',
      });
    this.isLoading = '';
    this.dataSource1.data = this.Accessdatalist;
  }
  deleteAccesstypeTableRow(event, element) {
    // if (this.key == "Delete") {
      let index = this.Accessdatalist.indexOf(element);
      if (index >= 0) {
        this.Accessdatalist.splice(index, 1);
        this.dataSource1.data = [];
        this.dataSource1.data = this.Accessdatalist;
      }
      Swal.fire('Success !', 'AccessType Table Row Deleted Successfully', 'success');
  }
  createWireTypeForm(){
    return this.formBuilder.group({
      Wiretype:'',
      wireOther:'',
      MicroCatheter:'',
      MicroWireOther:''
    })
  }
  onAddWiretypeData() {
    this.isLoading = 'save';
    this.dataSourc3.data = [];
    this.wiredatalist.push(
      {
        Wiretype: this.WireTypeFormGroup.get('Wiretype').value.name || '',
        wireOther: this.WireTypeFormGroup.get('wireOther').value || '',
        MicroCatheter: this.WireTypeFormGroup.get('MicroCatheter').value.name || '',
        Wire1Other: this.WireTypeFormGroup.get('MicroWireOther').value || '',
      });
    this.isLoading = '';
    this.dataSourc3.data = this.wiredatalist;
  }
  deleteWiretypeTableRow(event, element) {
    // if (this.key == "Delete") {
      let index = this.wiredatalist.indexOf(element);
      if (index >= 0) {
        this.wiredatalist.splice(index, 1);
        this.dataSourc3.data = [];
        this.dataSourc3.data = this.wiredatalist;
      }
      Swal.fire('Success !', 'Wiretype Table Row Deleted Successfully', 'success');
  }
  
  createImagingForm(){
    return this.formBuilder.group({
      IVUS:'',
      OCT:'',
      Imgothere:''
    })
  }
  onAddImagingData() {
    this.isLoading = 'save';
    this.dataSource4.data = [];
    this.Imgimgdatalist.push(
      {
        IVUS: this.ImagingFormGroup.get('IVUS').value.name || '',
        OCT: this.ImagingFormGroup.get('OCT').value.name || '',
        Imgothere: this.ImagingFormGroup.get('Imgothere').value || '',
      });
    this.isLoading = '';
    this.dataSource4.data = this.Imgimgdatalist;
  }
  deleteImagingTableRow(event, element) {
    // if (this.key == "Delete") {
      let index = this.Imgimgdatalist.indexOf(element);
      if (index >= 0) {
        this.Imgimgdatalist.splice(index, 1);
        this.dataSource4.data = [];
        this.dataSource4.data = this.Imgimgdatalist;
      }
      Swal.fire('Success !', 'Imaging Table Row Deleted Successfully', 'success');
  }
  createPhysiologyForm(){
    return this.formBuilder.group({
      Physiologytype:'',
      Physiologyvalue:''
    })
  }
  
  onAddPhysiologyData() {
    this.isLoading = 'save';
    this.dataSource5.data = [];
    this.Physiodatalist.push(
      {
        Physiologytype: this.PhysiologyFormGroup.get('Physiologytype').value.name || '',
        Physiologyvalue: this.PhysiologyFormGroup.get('Physiologyvalue').value.name || '',
      });
    this.isLoading = '';
    this.dataSource5.data = this.Physiodatalist;
  }
  deletePhysiologyTableRow(event, element) {
    // if (this.key == "Delete") {
      let index = this.Physiodatalist.indexOf(element);
      if (index >= 0) {
        this.Physiodatalist.splice(index, 1);
        this.dataSource5.data = [];
        this.dataSource5.data = this.Physiodatalist;
      }
      Swal.fire('Success !', 'Physiology Table Row Deleted Successfully', 'success');
  }

  SaveAccessType(){
    this.isLoading = 'submit';
    let submissionObj = {};
    let SaveAccessType= {};

    SaveAccessType['lesionId']  =  0;
    SaveAccessType['patientId']  = this.RegNo;
    SaveAccessType['visitId']  = 0;
    SaveAccessType['procedureId']  = 0;
    SaveAccessType['lesionType']  = this.ProcedureForm.get('LesionType').value.DropDownValue;
    SaveAccessType['location']  = this.ProcedureForm.get('Location').value;
    SaveAccessType['syntaxScore']  = this.ProcedureForm.get('SyntaxScore').value;
    SaveAccessType['indexLesion']  = this.ProcedureForm.get('IndexLesion').value;
    SaveAccessType['lesionSeverity']  = this.ProcedureForm.get('Severity').value.DropDownValue;
    SaveAccessType['lesionDevice']  = '';
    SaveAccessType['createdBy']  =this._loggedService.currentUserValue.user.id;

    submissionObj['saveLesionDetails'] = SaveAccessType;
    
    console.log(submissionObj);
    this._ClinicalDocumentService.SaveLesionDetails(submissionObj).subscribe(response => {
      console.log(response);
      if (response) {
        Swal.fire('Congratulations !', ' Access Type Saved Successfully  !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Access Type Not Updated', 'error');
      }
      this.isLoading = '';
    });
    }
















  createPesonalForm() {
    return this.formBuilder.group({
      // RegId: '',
      // PrefixID: '',
      // FirstName: ['', [
      //   Validators.required,
      //   Validators.pattern("^[A-Za-z] *[a-zA-Z]*$"),
      // ]],
      // MiddleName: ['', [

      //   Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      // ]],
      // LastName: ['', [
      //   Validators.required,
      //   Validators.pattern("^[A-Za-z]*[a-zA-z]*$"),
      // ]],
      // GenderId: '',

      // DateOfBirth: [{ value: this.registerObj.DateofBirth }],
      // AgeYear: ['', [
      //   Validators.required,
      //   Validators.maxLength(3),
      //   Validators.pattern("^[0-9]*$")]],
      // AgeMonth: ['', [
      //   Validators.pattern("^[0-9]*$")]],
      // AgeDay: ['', [

      //   Validators.pattern("^[0-9]*$")]],
      // PhoneNo: ['', [Validators.minLength(10),
      // Validators.maxLength(15),
      // Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      // ]],
      // Doctorname: '',
      // EmailId: '',
      // RegID: [''],
      // PageId: [''],

      // LVEF: [''],
      // GLS: [''],
      // RWMA: [''],
      // PApressure: [''],
      // Valve: [''],
      // Stenotic: [''],
      // Regurgitation: [''],
      // MSAR: [''],
      // MSAS: [''],
      // InflammatoryDiseases: '',

      // LesionType: '',
      // Location: '',
      // SyntaxScore: '',
      // IndexLesion: '',
      // Severity: '',
      // Calcified: '',
      // Thrombus: [''],
      // Proximal: [''],
      // Branch: [''],

      // AccessType: [''],
      // Accessvalue1: [''],
      // Accessvalue2: [''],
      // Other1: [''],
      // IronDef: [''],
      // USG: [''],
      // Puncture: [''],
      // Fluoro: [''],
      // Device: [''],


      // Wiretype: '',
      // wireOther: '',
      // MicroCatheter: '',
      // Wire1Other: '',

      // IVUS: '',
      // OCT: '',
      // Imgothere: '',


      // Physiologytype: '',
      // Physiologyvalue: ''
    });
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
          "DoctypeId": Id.DropDownId,
          advanceObj: this.PatientHeaderObj,
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);

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
    regInsert['addedBy'] = this._loggedService.currentUserValue.user.id;
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

}



export class D2EchoDet {
  LVEF: any;
  GLS: any;
  RWMA: any;
  PApressure: any;
  Valve: any;
  Stenotic: any;
  Regurgitation: any;
  MSAR: any;
  MSAS: any;
  constructor(D2EchoDet) {
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



export class AngioaccessType {
  AccessType: any;
  Accessvalue1: any;
  Accessvalue2: any;
  Other1: any;
  IronDef: any;
  USG: any;
  Puncture: any;
  Fluoro: any;
  Device: any;
  constructor(AngioaccessType) {
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


export class WireType {
  Wiretype: any;
  wireOther: any;
  MicroCatheter: any;
  Wire1Other: any;

  constructor(WireType) {
    this.Wiretype = WireType.Wiretype || '';
    this.wireOther = WireType.wireOther || '';
    this.MicroCatheter = WireType.MicroCatheter || '';
    this.Wire1Other = WireType.Wire1Other || '';

  }
}

export class ImagingType {
  IVUS: any;
  OCT: any;
  Imgothere: any;


  constructor(ImagingType) {
    this.IVUS = ImagingType.IVUS || '';
    this.OCT = ImagingType.OCT || '';
    this.Imgothere = ImagingType.Imgothere || '';

  }
}

export class PhysiologyType {
  Physiologytype: any;
  Physiologyvalue: any;


  constructor(PhysiologyType) {
    this.Physiologytype = PhysiologyType.Physiologytype || '';
    this.Physiologyvalue = PhysiologyType.Physiologyvalue || '';

  }
}


export class ProcedureType {
  LesionType: any;
  Location: any;
  SyntaxScore: any;
  IndexLesion: any;
  Severity: any;
  Calcified: any;
  Thrombus: any;
  Proximal: any;
  Branch: any;
  constructor(ProcedureType) {
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