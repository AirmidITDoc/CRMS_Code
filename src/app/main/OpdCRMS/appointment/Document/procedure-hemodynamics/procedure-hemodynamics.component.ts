import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import Swal from 'sweetalert2';

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

  regobj:any;
  PatientName:any;
  RegNo:any;
  MobileNo:any;

   LocationValue:any=0;
   SyntaxScoreValue:any=0;
   IndexLesionValue:any=0;
   SeverityPer:any=0;
   Critical:any=0;
   Significant:any=0;
   Intermediat:any=0;
   NonSignificant:any=0;

  CiticalList: string[] = ['88 %','90 %','92 %','95 %','99 %'];
  

  SignificantList: string[] = ['Significant','Non-Critical 70%','Non-Critical 72%','Non-Critical 75%','Non-Critical 80%'];
  IntermediateList: string[] = ['Intermediate 50%','Intermediate 55%','TacIntermediate 60%','Intermediate 65%','Intermediate 70%'];
  NotSignificantList: string[] = ['NotSignificant 10%','NotSignificant 20%','NotSignificant 30%','NotSignificant 40%','NotSignificant 50%'];
  CalcifiedList: string[] = ['Mild','Moderate','Severe'];
  ThrombusList: string[] = ['YES','NO'];
  BifurcationStatusList: string[] = ['YES','NO'];
  ProximalTortuosityList: string[] = ['YES','NO'];
  SideBranchList: string[] = ['YES','NO'];
  LIMAList: string[] = ['LIMA','SVG'];
   
  //  ThrombusList1: string[] = ['Mild','Moderate','Severe'];
  //  CalcifiedList1: string[] = ['YES','NO'];
   ProximalList: string[] = ['YES','NO'];
   SidebranchList: string[] = ['YES','NO'];

  dataSource = new MatTableDataSource<LocationListData>();
  Locationlist: any = [];

  displayedColumns = [
    'LocationValue',
    'SyntaxScoreValue',
    'IndexLesionValue',
    'SeverityPer',
    'Critical',
    'Significant',
    'Intermediat',
    'NonSignificant',
    'CalcifiedValue',
    'ThrombusValue',
    'ProximalTortuosityValue',
    'ImportantSideBranchValue',
    'action'
  ];



  constructor(  private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<ProcedureHemodynamicsComponent>) {
    this.mainform = this.MainForm();
    this.subform = this.SubForm();
   }

  ngOnInit(): void {
    if(this.data){
      this.regobj=this.data.advanceObj;
      this.PatientName=this.regobj.PatientName;
      this.RegNo=this.regobj.RegNo;
      this.MobileNo=this.regobj.MobileNo;

    }
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
    this.dialogRef.close();
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


onAddData() {
debugger
  this.isLoading = 'save';
  // if (this.SrvcName && (parseInt(this.b_price) != 0) && this.b_qty) {
    this.isLoading = 'save';
    this.dataSource.data = [];
    this.Locationlist.push(
      {
        LocationValue: this.LocationValue || '',
        SyntaxScoreValue: this.SyntaxScoreValue || '',
        IndexLesionValue: this.IndexLesionValue,
        SeverityPer: this.subform.get('SeverityPer').value || '',
        Critical: this.subform.get('Critical').value  || '',
        Significant: this.subform.get('Significant').value || '',
        Intermediat: this.subform.get('Intermediat').value || '',
        NonSignificant:this.subform.get('NonSignificant').value || '',
        CalcifiedValue: this.subform.get('CalcifiedValue').value || '',
        ThrombusValue:this.subform.get('ThrombusValue').value || '',
        ProximalTortuosityValue: this.subform.get('ProximalTortuosityValue').value || '',
        ImportantSideBranchValue:this.subform.get('ImportantSideBranchValue').value || ''
        // ChargesDate: this.dateTimeObj.date,
        // IsPathology: this.b_isPath,
        // IsRadiology: this.b_isRad,
        // ClassName: this.selectedAdvanceObj.ClassName || '',
        // ChargesAddedName: this.accountService.currentUserValue.user.id || 1,
        
      });
    this.isLoading = '';
    this.dataSource.data = this.Locationlist;
    // this.changeDetectorRefs.detectChanges();
  // }
  
}


deleteTableRow(element) {
  let index = this.Locationlist.indexOf(element);
  if (index >= 0) {
    this.Locationlist.splice(index, 1);
    this.dataSource.data = [];
    this.dataSource.data = this.Locationlist;
  }
  Swal.fire('Success !', 'List Row Deleted Successfully', 'success');
}



}




export class LocationListData {
  LocationValue:any;
  SyntaxScore:any;
  SyntaxScoreValue:any;
  IndexLesion1:any;
  IndexLesionValue:any;
  Severity1:any;
  SeverityPer:any;
  Critical:any;
  Significant:any;
  Intermediat:any;
  NonSignificant:any;
  LesionType:any;
  Calcified1:any;
  CalcifiedValue:any;
  ThrombusValue:any;
  Thrombus1:any;
  ProximalTortuosity:any;
  ProximalTortuosityValue:any;
  ImportantSideBranch:any;
  ImportantSideBranchValue:any;
  // CalcifiedValue1:any;
  //  ThrombusValue1:any;
  //  ProximalTortuosityValue1:any;
  //  ImportantSideBranchValue1:any;

  constructor(LocationListData) {
    {
      this.LocationValue = LocationListData.LocationValue || '';
      this.SyntaxScore = LocationListData.SyntaxScore || '';
      this.SyntaxScoreValue = LocationListData.SyntaxScoreValue || '';
      this.IndexLesion1 = LocationListData.IndexLesion1 || '';
      this.IndexLesionValue = LocationListData.IndexLesionValue || '';
      this.Severity1 = LocationListData.Severity1 || '';
      this.SeverityPer = LocationListData.SeverityPer || '';
      this.Critical = LocationListData.Critical || '';
      this.CalcifiedValue = LocationListData.CalcifiedValue ||'';
      this.ThrombusValue = LocationListData.ThrombusValue|| ' ';
      this.ProximalTortuosityValue = LocationListData.ProximalTortuosityValue || '' ;
      this.ImportantSideBranchValue = LocationListData.ImportantSideBranchValue || '';
    }
  }
}