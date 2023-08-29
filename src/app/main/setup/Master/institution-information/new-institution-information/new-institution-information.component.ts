import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { InstitutionInformationService } from '../institution-information.service';
import Swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-new-institution-information',
  templateUrl: './new-institution-information.component.html',
  styleUrls: ['./new-institution-information.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewInstitutionInformationComponent implements OnInit {

  isLoading: any;

  constructor(
    private formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    private accountService: AuthenticationService,
    public _institutionService: InstitutionInformationService,
  ) { }

  ngOnInit(): void {
   
  }



  closeDialog() {
    // console.log("closed")
    // this.dialogRef.close();
    this._institutionService.personalFormGroup.reset();
  }
  onClose(){
    this._matDialog.closeAll();
  }
  onSubmit() {
    this.isLoading = 'submit';

    if(!this._institutionService.personalFormGroup.get("InstitutionId").value){
    var m_data = {
      "insertInstitutionInformation": {
        "InstitutionId":0,// this._institutionService.personalFormGroup.get('MemberId').value.CaseId || 0,
        "InstitutionName": this._institutionService.personalFormGroup.get('InstitutionName').value || '',
        "Address": this._institutionService.personalFormGroup.get('Address').value || '',
        "ContactNo": this._institutionService.personalFormGroup.get('ContactNo').value || 0,
        "PinCode": this._institutionService.personalFormGroup.get('PinCode').value || '',
        "State": this._institutionService.personalFormGroup.get('State').value.CityId || 0,
        "StateCode": this._institutionService.personalFormGroup.get('StateCode').value || '',
        "GSTIN": this._institutionService.personalFormGroup.get('GSTIN').value || 0,
        "SAC": this._institutionService.personalFormGroup.get('SAC').value || '',
        "PAN": this._institutionService.personalFormGroup.get('PAN').value || '',
        "PlaceOfSupply": this._institutionService.personalFormGroup.get('PlaceOfSupply').value || '',
        "EmailId": this._institutionService.personalFormGroup.get('EmailId').value || '',
        "createdBy": this.accountService.currentUserValue.user.id
      }
    }
    this._institutionService.InsertInstitutionInformation(m_data).subscribe(response => {
      if (response) {
        Swal.fire('New Institute Information Save !', ' Institute Information Save Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Institute not saved', 'error');
      }
    });
  }else{

    var m_data1 = {
      "updateInstitutionInformation": {
        "operation":"UPDATE",
        "InstitutionId":this._institutionService.personalFormGroup.get('InstitutionId').value || 0,
        "InstitutionName": this._institutionService.personalFormGroup.get('InstitutionName').value || '',
        "Address": this._institutionService.personalFormGroup.get('Address').value || '',
        "ContactNo": this._institutionService.personalFormGroup.get('ContactNo').value || 0,
        "PinCode": this._institutionService.personalFormGroup.get('PinCode').value || '',
        "State": this._institutionService.personalFormGroup.get('State').value.CityId || 0,
        "StateCode": this._institutionService.personalFormGroup.get('StateCode').value || '',
        "GSTIN": this._institutionService.personalFormGroup.get('GSTIN').value || 0,
        "SAC": this._institutionService.personalFormGroup.get('SAC').value || '',
        "PAN": this._institutionService.personalFormGroup.get('PAN').value || '',
        "PlaceOfSupply": this._institutionService.personalFormGroup.get('PlaceOfSupply').value || '',
        "EmailId": this._institutionService.personalFormGroup.get('EmailId').value || '',
        "updatedBy": this.accountService.currentUserValue.user.id
      }
    }
    this._institutionService.UpdateInstitutionInformation(m_data1).subscribe(response => {
      if (response) {
        Swal.fire('Update Institute Information Save !', ' Institute Information Update Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Institute not Updated', 'error');
      }
    });
  }

  }
}
