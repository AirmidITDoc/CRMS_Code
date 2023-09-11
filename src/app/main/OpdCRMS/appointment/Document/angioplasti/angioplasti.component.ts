import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-angioplasti',
  templateUrl: './angioplasti.component.html',
  styleUrls: ['./angioplasti.component.scss']
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
  
  constructor(private _formBuilder: FormBuilder) {
    this.mainform = this.MainForm();
    this.subform = this.MainForm();
  }

  ngOnInit(): void {
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
      Pilot50: '',
      Pilot200: '',
      Gaia1: '',
      Gaia2: '',
      Gaia3: '',
      GaiaNext1: '',
      GaiaNext2: '',
      GaiaNext3: '',
      ConquestPro9: '',
      ConquestPro12: '',
      ConquestPro: '',
      FielderFC: '',
      Whisper: '',
      WhisperES: '',
      BMW: '',
      Other1: '',
      MicroCatheter: '',
      MicroCatheterStatusY: '',
      Finecross: '',
      CorsairPro: '',
      CorsairProXS: '',
      Crusader: '',
      Caravel: '',
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