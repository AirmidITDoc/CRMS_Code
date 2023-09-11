import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VisitMaster } from '../../appointment.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { AppointmentService } from '../../appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { DocPresentationComponent } from '../doc-presentation/doc-presentation.component';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewDocumentComponent implements OnInit {

  searchFormGroup:FormGroup;
  personalFormGroup:FormGroup;
  subFormGroup:FormGroup;
  dataSource = new MatTableDataSource<VisitMaster>();
  registerObj: any;
  filteredOptions: any;
  noOptionFound: boolean = false;
  screenFromString = 'registration';
  RegId:any;
  Nstemidiv2:boolean=true;
  sIsLoading:any;
  isRegIdSelected: boolean = false;
  Pasthistorydiv: boolean = false;
  isLoadings = false;
PatientName:any='';
Mobileno:any='';


  Doctype = [
    {id: 1, name: "Acute Coronary Syndrome"},
    {id: 2, name: "Stable Coronary Syndrome"},
    {id: 3, name: "Incidental / Detection of CAD"},
    // {id: 4, name: "Brazil"},
    // {id: 5, name: "England"}
 ];

 displayedColumns = [
 
];


 selectedValue = null;
  constructor(private formBuilder: FormBuilder,
    public _matDialog: MatDialog,
  public _AppointmentService: AppointmentService,) { }

  ngOnInit(): void {
    this.searchFormGroup = this.createSearchForm();
    this.personalFormGroup = this.createPesonalForm();
    this.subFormGroup=this.SubForm();
  }

  createSearchForm() {
    return this.formBuilder.group({
      // regRadio: ['registration'],
      RegId: ['']
    });
  }


  SubForm() {
    return this.formBuilder.group({
      PastCardiacProc:['false'],
      Angioplasty:['false'],
      CABG:['0'],
      VascularProc:[''],

      PastNonCardiacProc:['0'],
     
        });
  }


  getSelectedObj(obj) {
    debugger
    this.registerObj = obj;
    this.PatientName=this.registerObj.FirstName  +  ' ' + this.registerObj.MiddleName + ' ' +  this.registerObj.LastName;
    this.Mobileno=this.registerObj.MobileNo;
}



  getSearchList() {
    debugger

    var m_data={
      "Keyword":`${this.searchFormGroup.get('RegId').value}%`
    }
    if (this.searchFormGroup.get('RegId').value.length >= 1) {
      this._AppointmentService.getSearchRegistrationList1(m_data).subscribe(resData => {
       
        this.filteredOptions = resData;
        console.log(resData);
        if (this.filteredOptions.length == 0) {
          this.noOptionFound = true;
        } else {
          this.noOptionFound = false;
        }

      });
    }

  }

  createPesonalForm() {
  return this.formBuilder.group({
    DocId: '',
    // PrefixId: '',
  });
}
onChangeDocList(Id){
  debugger
 const dialogRef = this._matDialog.open(DocPresentationComponent,
    {
      maxWidth: "60%",
      height: '700px',
      width: '100%',
      data: {
        "DoctypeId": Id.id
      }
    });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed - Insert Action', result);
    
  });
}
  getOptionText(option) {
    if (!option) return '';
    return option.FirstName + ' ' + option.LastName + ' (' + option.RegId + ')';
  }

  onAdd(){}

  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    // console.log('dateTimeObj==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }


  onClose(){}
}
