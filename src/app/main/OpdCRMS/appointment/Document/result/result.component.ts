import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class ResultComponent implements OnInit {
  mainform:FormGroup;
  subform:FormGroup;
  Eventsdiv:boolean=false;
  Resultdiv:boolean=false;
  isLoading:any;
  screenFromString = 'admission-form';
  regobj:any;
  PatientName:any;
  RegNo:any;
  MobileNo:any;
  StemitypeList:[];

  constructor(private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ResultComponent>,
    ) {
    this.mainform = this.MainForm();
    
    this.subform = this.MainForm();}

  ngOnInit(): void {
    debugger
    if(this.data){
      this.regobj=this.data.advanceObj;
      this.PatientName=this.regobj.PatientName;
      this.RegNo=this.regobj.RegNo;
      this.MobileNo=this.regobj.MobileNo;

    }
  }


  MainForm(): FormGroup {
    return this._formBuilder.group({
      Aortogram: [false],
      LVEDP: [false],
      AP: [false],
      BP: [false],
      PAPressure: [false],
      IndexLesion: [false],

    });
  }


  SubForm(): FormGroup {
    return this._formBuilder.group({
      Result:'',
      Effectivestatus:'',
      Events:'',
      Carhlab:'',
      chestpain:'',
      EKGchanges:'',
      Hypotension:'',
      Bradycardia:'',
      Tachycardia:'',
      Flow:'',
      Perforation:'',
      UnforseenDissection:'',
      Inotropes:'',
      Ventilation:'',
      CPR:'',
      MICS:'',
      IABP:'',
      Impella:'',
      Others:'',
      Pericardiocentesis:'',
      EmergencySurgery:'',
      EmergencyPacing:'',
      
      Hours:'',
      HEKGChanges:'',
      HMI:'',
      HStroke:'',
      AKI:'',
      CKMBRaised:'',
      ReducedLVfunction:'',
      NeedforInotropes:'',
      NeedforDialysis:'',
      HOthers:'',
      HDeath:'',
      Revascularization:'',
      
      days:'',
      LVFunction:'',
      MI:'',
      Stroke:'',
      Death:'',
      RepeatPCI:'',
      CABG:'',


    });
  }
  onChangeEvents($event){
    debugger
    if($event.checked==true){
      this.Eventsdiv==true
    }
    else if($event.checked==false){
      this.Eventsdiv=false
    }
  }

  onChangeEffectivestatus($event){
    if($event.checked=true){
      // this.ActCorSyndromediv=true
    }
    else if($event.checked=false){
      // this.ActCorSyndromediv=false
    }
  }

  onChangeResult($event){
    if($event.checked==true){
      this.Resultdiv==true
    }
    else if($event.checked=false){
      this.Resultdiv=false
    }
  }
  
  dateTimeObj: any;
  getDateTime(dateTimeObj) {

    this.dateTimeObj = dateTimeObj;
  }

  onClose() {
    this.dialogRef.close();
  }


}
