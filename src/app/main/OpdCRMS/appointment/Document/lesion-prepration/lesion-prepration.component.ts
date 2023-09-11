import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lesion-prepration',
  templateUrl: './lesion-prepration.component.html',
  styleUrls: ['./lesion-prepration.component.scss']
})
export class LesionPreprationComponent implements OnInit {

  mainform: FormGroup;
  subform: FormGroup;

  MicroCathetercrossdiv: boolean = true;
  Laserdiv: boolean = true;
  Stablecorsyndiv: boolean = true;
  Nstemidiv2: boolean = true;
  // Stablecorsyndiv:boolean = true;

  countryList: any = [];
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
      MicroCathetercross: '',
      MicroCathetercrossstatus: '',
      Atherectomy: '',
      ROTA: '',
      CorssedY: '',
      CrossedSize: '',
      CrossedSpeed: '',
      CrossedTime: '',
      CrossedRuns: '',
      CorssedN: '',
      ROTAMicroCatheter: '',
      ROTAMicroCathetery: '',
      ROTAFinecross: '',
      ROTACrusader: '',
      ROTACaravel: '',
      ROTAOthers: '',
      Orbital: '',
      OrbitalCrossedY: '',
      OrbitalSize: '',
      OrbitalSpeed: '',
      OrbitalTime: '',
      OrbitalRuns: '',
      OrbitalCrossedN: '',
      OrbitalMicroCatheter: '',
      OrbitalMicroCathetery: '',
      OrbitalFinecross: '',
      OrbitalCrusader: '',
      OrbitalCaravel: '',
      OrbitalOthers: '',
      OrbitalMicroCatheterN: '',
      Laser: '',
      LaserCrossedY: '',
      LaserSize: '',
      Fluence: '',
      LaserTime: '',
      LaserTime1: '',
      LaserTime2: '',
      LaserMedium: '',
      LaserMediumType: '',
      LaserCrossedN: '',
      LaserMicroCatheter: '',
      LaserMicroCatheterY: '',
      LaserFinecross: '',
      LaserCrusader: '',
      LaserCaravel: '',
      LaserOthers: '',

      LaserMicroCatheterN: '',

      Tornus: '',
      TornusCrossedY: '',
      TornusCrossedSize: '',
      TornusossedN: '',
      TornusCrossedMicroCatheter: '',
      TornusCrossedMicroCatheterY: '',
      TornusFinecross: '',
      TornusCrusader: '',
      TornusCaravel: '',
      TornusOthers: '',
      TornusCrossedMicroCatheterN: '',

      Balloons: '',
      SemiCompliant: '',
      SCLength: '',
      SCDiameter: '',
      SCPressure: '',


      NonCompliant: '',
      NCLength: '',
      NCDiameter: '',
      NCPressure: '',
      Wolverine: '',
      WCLength: '',
      WCDiameter: '',
      WCPressure: '',
      OPNNC: '',
      OLength: '',
      ODiameter: '',
      OPressure: '',
      Scoring: '',
      ScoLength: '',
      ScoDiameter: '',
      ScoPressure: '',
      ThromboAspirationCatheter: '',
      ThromboACatheterY: '',
      ThromboACatheterN: '',
      GuideExtension: '',
      GuideExtensionY: '',
      GuideExtensionN: '',
      LesionPreparation: '',
      Complete: '',
      Hypotension: '',
      ChestpainPersist: '',
      EKGChanges: '',
      Perforation: '',
      UnforseenDissection: '',
      SlowFlow: '',
      BranchClosure: '',
      Imaging: '',
      ImagingY: '',
      IIVUS: '',
      SideBranchNo: '',
      Proximal: '',
      PRV: '',
      PLV: '',
      PPB: '',
      Distal: '',
      DRV: '',
      DLV: '',
      DPB: '',
      SBLength: '',
      SideBranchYES: '',
      LZMBP: '',
      LZRV: '',
      LZLV: '',
      LZPB: '',
      LZMBD: '',
      LZMBDRV: '',
      LZMBDLV: '',
      LZMBDPB: '',
      SBD: '',
      SBDRV: '',
      SBDLV: '',
      SBDPB: '',
      StentedSegment: '',
      ProximalEdge: '',
      PERV: '',
      PELV: '',
      PEPB: '',
      DistalEdge: '',
      DERV: '',
      DELV: '',
      DEPB: '',
      Patent: '',


      OSideBranchNo: '',
      OProximal: '',
      OPRV: '',
      OPLV: '',
      OPPB: '',
      ODistal: '',
      ODRV: '',
      ODLV: '',
      ODPB: '',
      OSBLength: '',
      OSideBranchYES: '',
      OLZMBP: '',
      OLZRV: '',
      OLZLV: '',
      OLZPB: '',
      OLZMBD: '',
      OLZMBDRV: '',
      OLZMBDLV: '',
      OLZMBDPB: '',
      OSBD: '',
      OSBDRV: '',
      OSBDLV: '',
      OSBDPB: '',
      OStentedSegment: '',
      OProximalEdge: '',
      OPERV: '',
      OPELV: '',
      OPEPB: '',
      ODistalEdge: '',
      ODERV: '',
      ODELV: '',
      ODEPB: '',
      OPatent: '',

      Other: '',
      OtherValue: '',
      
      OLength1: '',

      OSideBranchNO: '',
      
      OLZMBd: '',
      OLZMBRV: '',
      OLZMBLV: '',
      OLZMBPB: '',
      StentedSegment1: '',
      SSProximalEdge: '',
      SSPRv: '',
      SSPLV: '',
      SSPPB: '',
      SSDistalEdge: '',
      SSDRV: '',
      SSDLV: '',
      SSDPB: '',
      SSDPatient: '',
      ImagingN: '',
      ImagingNStatusY: '',
      ImagingHDIVUS: '',
      ImagingRefinity: '',
      ImagingOPticross: '',
      ImagingNStatusN: '',
      Stent: '',
      StentY: '',
      StentName1: '',
      MinDiameter1: '',
      MaxDiameter1: '',
      TotalStentLength1: '',
      Pressure1: '',
      StentName2: '',
      MinDiameter2: '',
      MaxDiameter2: '',
      TotalStentLength2: '',
      Pressure2: '',

      StentName3: '',
      MinDiameter3: '',
      MaxDiameter3: '',
      TotalStentLength3: '',
      Pressure3: '',

      StentN: ''
    });
  }


  onChangeMicroCathetercross($event) {
    debugger
    console.log($event)
    if ($event.checked == true) {
      // this.AccessTypediv = true
    }
    else {
      // this.AccessTypediv = false
    }
  }


  onChangeAtherectomy($event) {
    debugger
    console.log($event)
    if ($event.checked == true) {
      // this.IndexLesiondiv = true
    }
    else {
      // this.IndexLesiondiv = false
    }
  }

  onChangeBalloons($event) {
    if ($event.checked == true) {
      // this.LVEDPdiv=true
    } else {
      // this.LVEDPdiv=false
    }
  }

  onChangeThromboAspirationCatheter($event) {
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
  onChangeGuideExtension($event) {
    if ($event.checked == true) {
      // this.APdiv = true
    }
    else {
      // this.APdiv = false
    }
  }
  onChangeLesionPreparation($event) {
    if ($event.checked == true) {
      // this.BPdiv = true
    }
    else {
      // this.BPdiv = false
    }
  }

  onChangeStent($event) {
    if ($event.checked == true) {
      // this.IndexLesiondiv = true
    }
    else {
      // this.IndexLesiondiv = false
    }
  }


  onChangeImaging($event) {
    if ($event.checked == true) {
      // this.Typeofdibetesdiv=true
    }
    else {
      // this.Typeofdibetesdiv=false
    }
  }
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