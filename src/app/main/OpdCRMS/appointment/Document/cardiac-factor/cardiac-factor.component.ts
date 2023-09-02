import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cardiac-factor',
  templateUrl: './cardiac-factor.component.html',
  styleUrls: ['./cardiac-factor.component.scss']
})
export class CardiacFactorComponent implements OnInit {

  mainform:FormGroup;
  subform:FormGroup;
  ActCorSyndromediv:boolean=false;
  Stablecorsyndiv:boolean=false;
  CADdiv:boolean=false;
  isLoading:any;
  screenFromString = 'admission-form';

  constructor(  private _formBuilder: FormBuilder) {
    this.mainform = this.MainForm();
    this.subform = this.MainForm();
   }

  ngOnInit(): void {
  }

  MainForm(): FormGroup {
    return this._formBuilder.group({
      ActCorSyndrome:['false'],
      StableCorSymdrome:['false'],
      DecofCAD:['false'],
      // end: [(new Date()).toISOString()],
      // MrNo:'',
    });
  }


  SubForm(): FormGroup {
    return this._formBuilder.group({
      Hypertension :'',
      HypertensionStatus:'',
      OnMedication:'',
      OnMedicationstatus:'',
      DrugDetail:'',
      CKD:'',
      CKDstatus:'',
      Dialysis:'',
      Dialysisstatus:'',
      Typeofdibetes:'',
      Insuline:'',
      Insulinestatus:'',
      Oral:'',
      Oralstatus:'',
      Smoking:'',
      Smokingstatus:'',
      Tobacco:'',
      Tobaccostatus :'',
      Dyslip:'',
      LDL :'',
      LDLValue:'',
      TriG:'',
      Trigvalue:'',
      Inflammatory:'',
      Rheumatoid:'',
      SLE:'',
      Psoriasis:'',
      Other:'',
      LabTest:'',
      Hba1c:'',
      Creatinine:'',
      Hb:'',
      eGFR:'',
      Iron:'',
      VitDificency:'',
      CRP:'',
      
      
    });
  }


  onChangeActsynd($event){
debugger
    console.log($event)
    if($event.checked=true){
    this.ActCorSyndromediv=true
  }
  else if($event.checked=false){
    this.ActCorSyndromediv=false
  }
  }

  onChangeStableCor($event){
    if($event=true){
    this.Stablecorsyndiv=true
    }else{
      this.Stablecorsyndiv=false
    }
  }

  onChangeCAD($event){
    if($event=true){
    this.CADdiv=true
    }
    else{
      this.CADdiv=false
    }
  }


  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    
    this.dateTimeObj = dateTimeObj;
  }

  onClose(){

  }

}