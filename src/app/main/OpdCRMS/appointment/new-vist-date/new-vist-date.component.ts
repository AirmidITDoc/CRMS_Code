import { Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RegInsert, VisitMaster } from '../appointment.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppointmentService } from '../appointment.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-new-vist-date',
  templateUrl: './new-vist-date.component.html',
  styleUrls: ['./new-vist-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewVistDateComponent implements OnInit {

  
  registerObj = new VisitMaster({});
  // registerObj1 = new OPIPPatientModel({});
  name = new FormControl('');
  FirstName = new FormControl('');
  AreaId = new FormControl('');
  submitted = false;
  
  DepartmentList: any = [];
  
  DoctorList: any = [];
  Doctor1List: any = [];
  Doctor2List: any = [];
  PatientTypeList:any=[];
  
  isLinear = true;
  personalFormGroup: FormGroup;
  VisitFormGroup: FormGroup;
  searchFormGroup: FormGroup;
  registration: any;
  IsNewvisit: boolean = false;
  IsUpdatevisit: boolean = true;

 
  dataArray = {};
 
  Patientnewold:any  = 1;
  CaseIdList:any = [];
  
 
  
  isLoadings = false;
  isOpen = false;
  loadID = 0;
  savedValue: number = null;

  //department filter
  public departmentFilterCtrl: FormControl = new FormControl();
  public filteredDepartment: ReplaySubject<any> = new ReplaySubject<any>(1);

  //doctorone filter
  public doctorFilterCtrl: FormControl = new FormControl();
  public filteredDoctor: ReplaySubject<any> = new ReplaySubject<any>(1);


  private _onDestroy = new Subject<void>();

  options = [];
  filteredOptions: any;
  noOptionFound: boolean = false;
  @ViewChild('appointmentFormStepper') appointmentFormStepper: MatStepper;
  @Input() panelWidth: string | number;
  selectedPrefixId: any;

  isCompanySelected: boolean = false;
  public now: Date = new Date();
  isLoading: string = '';
  screenFromString = 'admission-form';
  dataSource = new MatTableDataSource<VisitMaster>();
  
  visitObj = new VisitMaster({});

  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  editor: string;

  constructor(public _opappointmentService: AppointmentService,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    public dialogRef: MatDialogRef<NewVistDateComponent>,
    public datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    // private advanceDataStored: AdvanceDataStored,
    private router: Router
  ) {
    // dialogRef.disableClose = true;
  }

  ngOnInit(): void {

    

    
    // this.personalFormGroup.markAllAsTouched();
    this.VisitFormGroup = this.createVisitdetailForm();
    // this.VisitFormGroup.markAllAsTouched();
    // this.searchFormGroup = this.createSearchForm();
    // this.searchFormGroup.markAllAsTouched();

    this.getDepartmentList();
    this.getDoctor2List();
    this.departmentFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDepartment();
      });


    this.doctorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDoctor();
      });

           

    if (this.data) {
    
      this.registerObj = this.data.registerObj;

      console.log(this.registerObj);

      this.setDropdownObjs1();
    }

  }


  setDropdownObjs1() {
    debugger;

    
    const toSelect = this.DepartmentList.find(c => c.Departmentid == this.registerObj.DepartmentId);
    this.personalFormGroup.get('Departmentid').setValue(toSelect);

    const ss = this.DoctorList.find(c => c.DoctorId == this.registerObj.DoctorId);
    this.personalFormGroup.get('DoctorID').setValue(ss);

    

    this.personalFormGroup.updateValueAndValidity();
    // this.dialogRef.close();

  }
 
  createVisitdetailForm() {
    return this.formBuilder.group({
      
    
      DoctorId: '',
      DoctorID: '',
      DepartmentId: '',
      Departmentid: '',
      DoctorIdOne: '',
      DoctorIdTwo: '',
      VisitId: '',
      VisitDate:[{ value: this.registerObj.VisitDate }],
      VisitTime:[{ value: this.registerObj.VisitTime }],
      ConsultantDocId: '',
      RefDocId: '',
      Doctorname: '',
      RefDocName: '',
      // CaseId:['', [
      //   Validators.required]],

      IsMark: '',
      
      Comments: '',
      Intime: '',
      OutTime: ''
    });
  }


  CaseListCombo(){
    this._opappointmentService.getCaseIDCombo().subscribe(data => { this.CaseIdList = data; })
    }

  getPatientTypeList() {
    this._opappointmentService.getPatientTypeCombo().subscribe(data => {
      this.PatientTypeList = data;
      this.VisitFormGroup.get('PatientTypeID').setValue(this.PatientTypeList[0]);
    })
  }

 
  getDepartmentList() {
    this._opappointmentService.getDepartmentCombo().subscribe(data => {
      this.DepartmentList = data;
      console.log(data);
      this.filteredDepartment.next(this.DepartmentList.slice());
    });
  }

 
  // department filter code
  private filterDepartment() {

    if (!this.DepartmentList) {
      return;
    }
    // get the search keyword
    let search = this.departmentFilterCtrl.value;
    if (!search) {
      this.filteredDepartment.next(this.DepartmentList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredDepartment.next(
      this.DepartmentList.filter(bank => bank.departmentName.toLowerCase().indexOf(search) > -1)
    );
  }

 

  // doctorone filter code  
  private filterDoctor() {

    if (!this.DoctorList) {
      return;
    }
    // get the search keyword
    let search = this.doctorFilterCtrl.value;
    if (!search) {
      this.filteredDoctor.next(this.DoctorList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredDoctor.next(
      this.DoctorList.filter(bank => bank.Doctorname.toLowerCase().indexOf(search) > -1)
    );
  }
  onClear() {
    this._opappointmentService.mySaveForm.reset({ IsDeleted: 'false' });
    this._opappointmentService.initializeFormGroup();
  }




  openChanged(event) {
    this.isOpen = event;
    this.isLoading = event;
    if (event) {
      this.savedValue = this.departmentFilterCtrl.value;
      this.options = [];
      this.departmentFilterCtrl.reset();
      this._opappointmentService.getDepartmentCombo();
    }
  }

  OnChangeDoctorList(departmentObj) {
       
    this._opappointmentService.getDoctorMasterCombo(departmentObj.Departmentid).subscribe(
      data => {
        this.DoctorList = data;
        console.log(this.DoctorList);
        this.filteredDoctor.next(this.DoctorList.slice());
      })
  }


  getDoctor2List() {
    this._opappointmentService.getDoctorMaster2Combo().subscribe(data => { this.Doctor2List = data; })
  }



  getOptionText(option) {
    if (!option) return '';
    return option.FirstName + ' ' + option.LastName + ' (' + option.RegId + ')';
  }

  getSelectedObj(obj) {
  debugger;
    console.log('obj==', obj);
    let a,b,c ;

    a =obj.AgeDay.trim();;
    b =obj.AgeMonth.trim();
    c =obj.AgeYear.trim();
    console.log(a,b,c);
    obj.AgeDay=a;
    obj.AgeMonth=b;
    obj.AgeYear=c;
    this.registerObj = obj;
    this.setDropdownObjs();
  }

  

  setDropdownObjs() {
  
    this.personalFormGroup.updateValueAndValidity();
  }

  VisitUpdate(){

    this.isLoading = 'submit';
    let submissionObj = {};
      let visitMasterUpdate = {};
         
   
      visitMasterUpdate['VisitId'] = this.registerObj.VisitId;
    
      visitMasterUpdate['VisitDate'] = this.datePipe.transform(this.VisitFormGroup.get('VisitDate').value.value,"MM-dd-yyyy");
      visitMasterUpdate['VisitTime'] =this.datePipe.transform(this.VisitFormGroup.get('VisitTime').value.value,"shortTime");
      visitMasterUpdate['ConsultantDocId'] = this.VisitFormGroup.get('DoctorID').value.DoctorId || 0;//? this.VisitFormGroup.get('DoctorId').value.DoctorId : 0;
   
      visitMasterUpdate['createdBy'] = this.accountService.currentUserValue.user.id;
   
    submissionObj['visitMasterUpdate'] = visitMasterUpdate;

    
    // submissionObj['tokenNumberWithDoctorWiseSave'] = tokenNumberWithDoctorWiseInsert;
    console.log(submissionObj);
    this._opappointmentService.VisitUpdate(submissionObj).subscribe(response => {
      console.log(response);
      if (response) {
        Swal.fire('Congratulations !', 'New Visit Update Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
                      
          }
         
        });
      } else {
        Swal.fire('Error !', 'Visit not Updated', 'error');
      }
      this.isLoading = '';
      
    });
  }


  VisitAdd() {
  

      this.isLoading = 'submit';
      let submissionObj = {};
        let visitMasterAdd = {};
           
        // https://stackoverflow.com/questions/48649987/angular-material-datetime-picker-component?
      visitMasterAdd['VisitId'] = 0;
      visitMasterAdd['RegID'] = this.registerObj.RegNo;
      visitMasterAdd['VisitDate'] = this.datePipe.transform(this.VisitFormGroup.get('VisitDate').value.value,"MM-dd-yyyy");
      visitMasterAdd['VisitTime'] = this.datePipe.transform(this.VisitFormGroup.get('VisitTime').value.value,"HH-mm-ss");
      visitMasterAdd['CaseID'] = 0;
      visitMasterAdd['UnitId'] = 1;
      visitMasterAdd['PatientTypeId'] = this.registerObj.PatientTypeId;
      visitMasterAdd['ConsultantDocId'] = this.VisitFormGroup.get('DoctorID').value.DoctorId || 0;
      visitMasterAdd['RefDocId'] = this.registerObj.RefDocId;

      visitMasterAdd['TariffId'] = this.registerObj.TariffId;
      visitMasterAdd['CompanyId'] = 0;
      visitMasterAdd['createdBy'] = this.accountService.currentUserValue.user.id;
      visitMasterAdd['updatedBy'] = this.accountService.currentUserValue.user.id;
      visitMasterAdd['IsCancelled'] = 0;
      visitMasterAdd['IsCancelledBy'] = 0;
      visitMasterAdd['IsCancelledDate'] = '2023-06-22T09:52:54.616Z';

      visitMasterAdd['ClassId'] = 1;
      visitMasterAdd['DepartmentId'] = this.VisitFormGroup.get('DoctorID').value.DepartmentId;
   
      visitMasterAdd['PatientOldNew'] = this.Patientnewold;
      visitMasterAdd['FirstFollowupVisit'] = 0,
      visitMasterAdd['appPurposeId'] =1;
      visitMasterAdd['FollowupDate'] = "2023-06-22T09:52:54.616Z";
      visitMasterAdd['IsMark'] = 0,
 
    visitMasterAdd['Comments'] = "";
    visitMasterAdd['Intime'] = '2023-06-22T09:52:54.616Z';
    visitMasterAdd['outTime'] = '2023-06-22T09:52:54.616Z';


      submissionObj['visitMasterAdd'] = visitMasterAdd;

      
      // submissionObj['tokenNumberWithDoctorWiseSave'] = tokenNumberWithDoctorWiseInsert;
      console.log(submissionObj);
      this._opappointmentService.VisitInsert(submissionObj).subscribe(response => {
        console.log(response);
        if (response) {
          Swal.fire('Congratulations !', 'New Visit save Successfully !', 'success').then((result) => {
            if (result.isConfirmed) {
              this._matDialog.closeAll();
                          
            }
           
          });
        } else {
          Swal.fire('Error !', 'Visit not saved', 'error');
        }
        this.isLoading = '';
        
      });
   
  }

  // createSearchForm() {
    
  //   return this.formBuilder.group({
  //     regRadio: ['NewVisit'],
  //     RegId: [{ value: '', disabled: this.IsNewvisit },]
  //     // [Validators.required]]
  //   });
  // }

  onChangeReg(event) {

    debugger;
    
    if (event.value == 'NewVisit') {
   
      this.IsNewvisit = false;
      this.IsUpdatevisit = true;
   
    } else {

      this.IsNewvisit = true;
      this.IsUpdatevisit = false;
   
    }
  }



  onClose() {
    // this._opappointmentService.mySaveForm.reset();
     this.dialogRef.close();
  }

 
  onDoctorOneChange(value) {
    console.log(this.VisitFormGroup.get('DoctorIdOne').value.reset(''));
  }

  backClicked() {
    this.appointmentFormStepper.previous();
  }


  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    // console.log('dateTimeObj==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  get showNameEditor() {
    return this.editor === 'name';
  }


  


}