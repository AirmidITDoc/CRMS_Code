import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-doc-presentation',
  templateUrl: './doc-presentation.component.html',
  styleUrls: ['./doc-presentation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DocPresentationComponent implements OnInit {

  
  subform:FormGroup;
  toppings  = new FormControl('');
  UnstabletypeList: string[] = ['Hypotension <90 mmHg','Hypoxia','Tachy','Brady','ROSC'];
  StemitypeList: string[] = ['Anterior','Posterior','Lateral','Inferior'];
  AnginatypeList:string[]=['Stable','Progressive'];
  PositivetypeList:string[]=['Positive','Negative'];
  ScoretypeList: string[] = ['Critical','Significant',' Not-Significant'];
 
  InducibletypeList:string[]=['TMT','MPI','MRI Perfusion','Nuclear Scan','DSE'];
  countryList: any = [];

  Stemidiv:boolean=true;
  Stablecorsyndiv:boolean=false;
  Hemodynamicdiv:boolean=false;
  Hemodynamicunstablediv:boolean=false;
  CADdiv:boolean=false;


  type:any=0;
  screenFromString = 'admission-form';
  registerObj: any;
  ActCorSyndromediv:boolean=false;
  

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DocPresentationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.subform = this.SubForm();

    debugger
    this.registerObj =this.data;
    this.type=this.data.DoctypeId;

    if(this.type==1){
      this.ActCorSyndromediv=true
    }
    if(this.type==2){
      this.Stablecorsyndiv=true
    }
    if(this.type==3){
      this.CADdiv=true
    }
  }


  SubForm() {
    return this._formBuilder.group({
      Stemi:['true'],
      Nstemi:['false'],
      Cppresentation:['0'],
      Cppresentationduration:[''],

      Hemodynamic:['0'],
      Hemodynamicstatus:['0'],
      Hemodynamicstatus1:['stable'],
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
     
      Angnia:['true'],

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

  onChangeStemi($event){
    debugger
    console.log($event.value);
    if($event.source.name==="Stemi"){
      this.Stemidiv=false
    }else{
      this.Stemidiv=true
    }
  }
  onChangeHemodynamic($event){
    debugger
    console.log($event.value);
    if($event.source.name==="Stemi"){
      this.Hemodynamicdiv=false
    }else{
      this.Hemodynamicdiv=true
    }
  }

  onChangeHemodynamicstatus1($event){
    debugger
    if($event.source.name==="stable"){
      this.Hemodynamicdiv=false
    }else{
      this.Hemodynamicunstablediv=true
    }


  }

  onChangeInducibleTypeStatus(){

  }



  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    // console.log('dateTimeObj==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

  onClose(){
    this.dialogRef.close();
  }
}
