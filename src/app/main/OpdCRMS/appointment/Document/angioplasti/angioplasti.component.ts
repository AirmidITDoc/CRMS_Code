import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-angioplasti',
  templateUrl: './angioplasti.component.html',
  styleUrls: ['./angioplasti.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AngioplastiComponent implements OnInit {

  mainform: FormGroup;
  subform: FormGroup;
  countryList: any = [];

  isLoading: any;
  screenFromString = 'admission-form';
  IVUSY: boolean = false;
  OCTStuatus: boolean = false;
  OCT:boolean=false;
  PhysiologystatusY: boolean = false;
  Other2: boolean = false;
  AccessTypediv: boolean = false;
  Otherdiv: boolean = false;
  USGGuidanceStatusdiv: boolean = false;
  APdiv: boolean = false;
  BPdiv: boolean = false;
  ImagingCrossedN: boolean = false;
  MicroCatheterStatusN: boolean = false;
  IndexLesiondiv: boolean = false;
  Inflammatorydiv: boolean = false;
  LabTestdiv: boolean = false;
  IVUSN: boolean = false;
  MicroCatheterStatusY: boolean = false;
  Other: boolean = false;

  
  regobj:any;
  PatientName:any;
  RegNo:any;
  MobileNo:any;
 
 
  DeviceUsedist: string[] = ['Pace Wire','Impella','IABP','Guide Catheter','Vanous Access'];
  WireTypeList: string[] = ['RunthroughNS','Pilot50','Pilot200','Gaia1','Gaia2','Gaia3','GaiaNext1','GaiaNext2','GaiaNext3','ConquestPro9','ConquestPro12','ConquestPro','FielderFC','Whisper','WhisperES','BMW'];
  DynamicList:string[] = ['0.9','0.8','0.7','0,6','0.5'];
  MicroCatheterUsedist: string[] = ['Finecross','CorsairPro','CorsairProXS','Crusader','Caravel'];
  HDUsedlist:string[] = ['1. 60 MHz HD IVUS','2.6 MHz','3.6 MHz']
  Refinitylist:string[] = ['2. 45 MHz Refinity','2.6 MHz','3.6 MHz']
  Opticrosslist:string[] = ['3. 40 MHz Opticross','2.6 MHz','3.6 MHz']
  
  constructor(private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogref:MatDialogRef<AngioplastiComponent>) {
   
  }

  ngOnInit(): void {
    this.mainform = this.MainForm();
    this.subform = this.SubForm();
    
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
      AccessType: '',
      Arterial: '',
      ArterialType: '',
      ArterialSide: '',
      Venous: '',
      VenousType: '',
      VenousSide: '',
      Other: '',
      OtherValue: '',
      Size: '',
      SizeType: '',
      USGGuidance: '',
      USGGuidanceStatus: '',
      MicroPuncture: '',
      MicroPunctureStatus: '',
      Deviceused: '',
      DeviceusedType: '',
      Wire: '',
      Rt: '',
      RunthroughNS: '',
      Other1: '',
      MicroCatheter: '',
      MicroCatheterStatusY: '',
      Others1: '',
      MicroCatheterStatusN: '',
      Imaging: '',
      ImagingCrossed: '',
      ImagingCrossedY: '',
      IVUS: '',
      IVUSY: '',
      HD: '',
      Refinity: '',
      Opticross: '',
      IVUSN: '',
      OCT: '',
      OCTStuatus: '',
      Other2: '',
      Other2Value: '',
      ImagingCrossedN: '',
      Physiology: '',
      PhysiologystatusY: '',
      Dynamic: '',
      DynamicList1: '',
      dFR: '',
      dFRList: '',
      iFR: '',
      iFRList: '',
      Option4: '',
      PhysiologystatusN: ''


    });
  }


  onChangeAccessType($event) {
    debugger
    console.log($event)
    if ($event.checked == true) {
      this.AccessTypediv = true
    }
    else {
      this.AccessTypediv = false
    }
  }


  IndexLesion($event) {
    debugger
    console.log($event)
    if ($event.checked == true) {
      this.IndexLesiondiv = true
    }
    else {
      this.IndexLesiondiv = false
    }
  }

  onChangeLVEDP($event) {
    if ($event.checked == true) {
      // this.LVEDPdiv=true
    } else {
      // this.LVEDPdiv=false
    }
  }

  onChangePAPressure($event) {
    if ($event.checked == true) {
      // this.PAPressurediv=true
    }
    else {
      // this.PAPressurediv=false
    }
  }


  dateTimeObj: any;
  getDateTime(dateTimeObj) {

    this.dateTimeObj = dateTimeObj;
  }

  onClose() {
    this.dialogref.close();
  }


  //Cardiac part
  onChangeAP($event) {
    if ($event.checked == true) {
      this.APdiv = true
    }
    else {
      this.APdiv = false
    }
  }
  onChangeBP($event) {
    if ($event.checked == true) {
      this.BPdiv = true
    }
    else {
      this.BPdiv = false
    }
  }

  onChangeIndexLesion($event) {
    if ($event.checked == true) {
      this.IndexLesiondiv = true
    }
    else {
      this.IndexLesiondiv = false
    }
  }


  //   onChangeTypeofdibetes($event){
  //     if($event.checked==true){
  //       this.Typeofdibetesdiv=true
  //       }
  //       else{
  //         this.Typeofdibetesdiv=false
  //       }
  //   }
  //   onChangeSmoking($event){
  //     if($event.checked==true){
  //       this.Smokingdiv=true
  //       }
  //       else{
  //         this.Smokingdiv=false
  //       }
  //   }

  //   onChangeTobacco($event){
  //     if($event.checked==true){
  //       this.Tobaccondiv=true
  //       }
  //       else{
  //         this.Tobaccondiv=false
  //       }
  //   }

  //   onChangeDyslip($event){
  //     if($event.checked==true){
  //       this.Dyslipdiv=true
  //       }
  //       else{
  //         this.Dyslipdiv=false
  //       }
  //   }

  //   onChangeInflammatory($event){
  //     if($event.checked==true){
  //       this.Inflammatorydiv=true
  //       }
  //       else{
  //         this.Inflammatorydiv=false
  //       }
  //   }

  // onChangeLabTest($event){
  //   if($event.checked==true){
  //     this.LabTestdiv=true
  //     }
  //     else{
  //       this.LabTestdiv=false
  //     }
  // }
}