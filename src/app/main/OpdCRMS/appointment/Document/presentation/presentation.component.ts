import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PresentationComponent implements OnInit {

  mainform:FormGroup;
  subform:FormGroup;
  ActCorSyndromediv:boolean=false;
  Stablecorsyndiv:boolean=false;
  CADdiv:boolean=false;
  isLoading:any;
  screenFromString = 'admission-form';

  Hypertensiondiv:boolean=false;
  CKDdiv:boolean=false;

  Dialysisdiv:boolean=false;

  Typeofdibetesdiv:boolean=false;
  Smokingdiv:boolean=false;
  Tobaccondiv:boolean=false;
  Dyslipdiv:boolean=false;
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
      ActCorSyndrome:[false],
      StableCorSymdrome:[false],
      DecofCAD:[false],
      // end: [(new Date()).toISOString()],
      // MrNo:'',
    });
  }


  SubForm(): FormGroup {
    return this._formBuilder.group({
      Stemi:['false'],
      Nstemi:['false'],
      Cppresentation:['false'],
      Cppresentationduration:[''],

      Hemodynamic:['0'],
      Hemodynamicstatus:['0'],
      StemiTypeId:[''],
      Othere :'',
     
      SVGAElementtablestatus:[''],
      Hypertension:['0'],
      Hypoxia:['0'],
     
      Tachy:'',
      Brady:['1'],
      Rosc:['1'],
     
      Ekgchange:'',
      Enzyme:['1'],
      Othere1:['1'],
     
      Angnia:['1'],

      Induciblestatus:'',
      Angniastatus:['1'],
      Condtionstatus:['1'],
      InducibleTypeId:['1'],
      InducibleTypeStatus:['1'],



      TypeofCAD:'',
      Routine:['1'],
      CalciumScore:['1'],
     
      CalciumScorestatus:'',
      Score:['1'],
      Other3:['1'],
     
      CTType:['1'],

      Echo:'',
      LVEF:['1'],
      GLS:['1'],
      RWMA:['1'],
      LVEFType:['1'],



      
    });
  }


  onChangeActsynd($event){
debugger
    console.log($event)
    if($event.checked == true){
    this.ActCorSyndromediv=true
  }
  else{
    this.ActCorSyndromediv=false
  }
  }

  onChangeStableCor($event){
    if($event.checked==true){
    this.Stablecorsyndiv=true
    }else{
      this.Stablecorsyndiv=false
    }
  }

  onChangeCAD($event){
    if($event.checked==true){
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

  
  //Cardiac part
  onChangeHypertension($event){
    if($event.checked==true){
      this.Hypertensiondiv=true
      }
      else{
        this.Hypertensiondiv=false
      }
  }
  onChangeDialysis($event){
    if($event.checked==true){
      this.CKDdiv=true
      }
      else{
        this.CKDdiv=false
      }
  }

  onChangeCKD($event){
    if($event.checked==true){
      this.Dialysisdiv=true
      }
      else{
        this.Dialysisdiv=false
      }
  }


  onChangeTypeofdibetes($event){
    if($event.checked==true){
      this.Typeofdibetesdiv=true
      }
      else{
        this.Typeofdibetesdiv=false
      }
  }
  onChangeSmoking($event){
    if($event.checked==true){
      this.Smokingdiv=true
      }
      else{
        this.Smokingdiv=false
      }
  }

  onChangeTobacco($event){
    if($event.checked==true){
      this.Tobaccondiv=true
      }
      else{
        this.Tobaccondiv=false
      }
  }

  onChangeDyslip($event){
    if($event.checked==true){
      this.Dyslipdiv=true
      }
      else{
        this.Dyslipdiv=false
      }
  }

  onChangeInflammatory($event){
    if($event.checked==true){
      this.Inflammatorydiv=true
      }
      else{
        this.Inflammatorydiv=false
      }
  }

onChangeLabTest($event){
  if($event.checked==true){
    this.LabTestdiv=true
    }
    else{
      this.LabTestdiv=false
    }
}
}