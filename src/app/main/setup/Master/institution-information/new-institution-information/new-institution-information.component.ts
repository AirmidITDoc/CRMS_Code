import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { InstitutionInformationService } from '../institution-information.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-institution-information',
  templateUrl: './new-institution-information.component.html',
  styleUrls: ['./new-institution-information.component.scss']
})
export class NewInstitutionInformationComponent implements OnInit {
  personalFormGroup: FormGroup;
  isLoading: any;

  constructor(
    private formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    private accountService: AuthenticationService,
    public _institutionService: InstitutionInformationService,
  ) { }

  ngOnInit(): void {
    this.personalFormGroup = this.createPesonalForm();
  }

  
  createPesonalForm() {
    return this.formBuilder.group({
      InstitutionId: '',
      InstitutionName: '',
      Address: '',
      ContactNo: '',
      PinCode: '',
      State: '',
      StateCode: ' ',
      GSTIN: '',
      SAC:'',
      PAN:'',
      PlaceOfSupply:'',
      EmailId: '',
      CreatedBy:0,
      UpdatedBy:0
    });
  }

  closeDialog() {
    // console.log("closed")
    // this.dialogRef.close();
    this.personalFormGroup.reset();
  }
  onClose(){
    
  }
  onSubmit() {
    this.isLoading = 'submit';
    var m_data = {
      "insertInstitutionInformation": {
        "InstitutionId":0,// this.personalFormGroup.get('MemberId').value.CaseId || 0,
        "InstitutionName": this.personalFormGroup.get('InstitutionName').value || '',
        "Address": this.personalFormGroup.get('Address').value || '',
        "ContactNo": this.personalFormGroup.get('ContactNo').value || 0,
        "PinCode": this.personalFormGroup.get('PinCode').value || '',
        "State": this.personalFormGroup.get('State').value.CityId || 0,
        "StateCode": this.personalFormGroup.get('StateCode').value || '',
        "GSTIN": this.personalFormGroup.get('GSTIN').value || 0,
        "SAC": this.personalFormGroup.get('SAC').value || '',
        "PAN": this.personalFormGroup.get('PAN').value || '',
        "PlaceOfSupply": this.personalFormGroup.get('PlaceOfSupply').value || '',
        "EmailId": this.personalFormGroup.get('EmailId').value || '',
        "createdBy": this.accountService.currentUserValue.user.id
      }
    }
    console.log(m_data);
    this._institutionService.InsertInstitutionInformation(m_data).subscribe(response => {
      if (response) {
        Swal.fire('New Sponser Information Save !', ' Sponser Information Save Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'MemberDetail not saved', 'error');
      }
    });


  }
}
