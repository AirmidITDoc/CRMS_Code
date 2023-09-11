import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-procedure-hemodynamics',
  templateUrl: './procedure-hemodynamics.component.html',
  styleUrls: ['./procedure-hemodynamics.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProcedureHemodynamicsComponent implements OnInit {

  mainform:FormGroup;
  subform:FormGroup;
  ActCorSyndromediv:boolean=false;
  Stablecorsyndiv:boolean=false;
  CADdiv:boolean=false;
  isLoading:any;
  screenFromString = 'admission-form';
 

Aortogramdiv:boolean=false;
LVEDPdiv:boolean=false;
PAPressurediv:boolean=false;
APdiv:boolean=false;
BPdiv :boolean=false;


IndexLesiondiv:boolean=false;
  Inflammatorydiv:boolean=false;
  LabTestdiv:boolean=false;

  constructor(  private _formBuilder: FormBuilder) {
    this.mainform = this.MainForm();
    this.subform = this.MainForm();
   }

  ngOnInit(): void {
  }

  MainForm(): FormGroup {
    return this._formBuilder.group({
      Aortogram:[false],
      LVEDP:[false],
      AP:[false],
      BP:[false],
      PAPressure:[false],
      IndexLesion:[false],
      
    });
  }


  SubForm(): FormGroup {
    return this._formBuilder.group({
      Aortogram:'',
      Systolic:'',
      Diastolic:'',
      MAP:'',
      LVEDP:'',
      LVEDPValue:'',
      PAPressure:'',
      PSystolic:'',
      PDiastolic:'',
      PMap:'',
      PCWP:'',
      A:'',
      Denovo:'',
      NativeLesion:'',
      Graft:'',
      LIMASVG:'', 
      AISR:'',
      B:'',
      BISR:'',
      ISRValue:'',
      Score:'',
      Severity:'',
      Description:'',
      Calcified:'',
      Thrombus:'',
      Bifurcation:'',
      BifurcationStatus:'',
      AortoOstial:'',
      IndexLesion:'',
      Location1:'',
      LocationValue:'',
      SyntaxScore:'',
      SyntaxScoreValue:'',
      IndexLesion1:'',
      IndexLesionValue:'',
      Severity1:'',
      SeverityPer:'',
      Critical:'',
      Significant:'',
      Intermediat:'',
      NonSignificant:'',
      LesionType:'',
      Calcified1:'',
      CalcifiedValue:'',
      ThrombusValue:'',
      Thrombus1:'',
      ProximalTortuosity:'',
      ProximalTortuosityValue:'',
      ImportantSideBranch:'',
      ImportantSideBranchValue:'',
      Location2:'',
      Location4:'',
      SyntaxScore2:'',
      SyntaxScore2Value:'',
      IndexLesion2:'',
      IndexLesion2Value:'',
      Severity2:'',
      Severity2Per:'',
      Severity2Critical:'',
      SeveritySignificant:'',
      SeverityIntermediat:'',
      SeverityNonSignificant:'',
      LesionType2:'',
      Calcified2:'',
      Calcified2Value:'',
      Thrombus2:'',
      Thrombus2Value:'',
      ProximalTortuosity2:'',
      ProximalTortuosityValue2:'',
      ImportantSideBranch2:'',
      ImportantSideBranchValue2:'',
      
           
    });
  }


  onChangeAortogram($event){
    debugger
        console.log($event)
        if($event.checked == true){
        this.Aortogramdiv=true
      }
      else{
        this.Aortogramdiv=false
      }
      }


  IndexLesion($event){
debugger
    console.log($event)
    if($event.checked == true){
    this.IndexLesiondiv=true
  }
  else{
    this.IndexLesiondiv=false
  }
  }

  onChangeLVEDP($event){
    if($event.checked==true){
    this.LVEDPdiv=true
    }else{
      this.LVEDPdiv=false
    }
  }

  onChangePAPressure($event){
    if($event.checked==true){
    this.PAPressurediv=true
    }
    else{
      this.PAPressurediv=false
    }
  }


  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    
    this.dateTimeObj = dateTimeObj;
  }

  onClose(){

  }

  
  //Cardiac part
  onChangeAP($event){
    if($event.checked==true){
      this.APdiv=true
      }
      else{
        this.APdiv=false
      }
  }
  onChangeBP($event){
    if($event.checked==true){
      this.BPdiv=true
      }
      else{
        this.BPdiv=false
      }
  }

  onChangeIndexLesion($event){
    if($event.checked==true){
      this.IndexLesiondiv=true
      }
      else{
        this.IndexLesiondiv=false
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