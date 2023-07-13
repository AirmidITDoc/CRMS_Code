import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { SponserService } from '../sponser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newsponserinformation',
  templateUrl: './newsponserinformation.component.html',
  styleUrls: ['./newsponserinformation.component.scss']
})
export class NewsponserinformationComponent implements OnInit {

  isLoading: any;

  constructor( private formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    private accountService: AuthenticationService,
    public _sponserService: SponserService,
    ) { }

  ngOnInit(): void {
   
  }

 

  closeDialog() {
    // console.log("closed")
    // this.dialogRef.close();
    this._sponserService.personalFormGroup.reset();
  }

  onSubmit() {
    this.isLoading = 'submit';

    if(!this._sponserService.personalFormGroup.get('SponserId').value){
    var m_data = {
      "insertSponserInformation": {
        "sponserId":0,
        "SponserName": this._sponserService.personalFormGroup.get('SponserName').value || '',
        "Address": this._sponserService.personalFormGroup.get('Address').value || '',
        "ContactNo": this._sponserService.personalFormGroup.get('ContactNo').value || 0,
        "PinCode": this._sponserService.personalFormGroup.get('PinCode').value || '',
        "State": this._sponserService.personalFormGroup.get('State').value || '',
        "StateCode": this._sponserService.personalFormGroup.get('StateCode').value || '',
        "GSTIN": this._sponserService.personalFormGroup.get('GSTIN').value || 0,
        "SAC": this._sponserService.personalFormGroup.get('SAC').value || '',
        "PAN": this._sponserService.personalFormGroup.get('PAN').value || '',
        "PlaceOfSupply": this._sponserService.personalFormGroup.get('PlaceOfSupply').value || '',
        "EmailId": this._sponserService.personalFormGroup.get('EmailId').value || '',
        "createdBy": this.accountService.currentUserValue.user.id
      }
    }
    console.log(m_data);
    this._sponserService.InsertSponserInformation(m_data).subscribe(response => {
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
  else{
    var m_data1 = {
      "updateSponserInformation": {
        "operation": "UPDATE",
        "sponserId":this._sponserService.personalFormGroup.get('SponserId').value.sponserId || 0,
        "SponserName": this._sponserService.personalFormGroup.get('SponserName').value || '',
        "Address": this._sponserService.personalFormGroup.get('Address').value || '',
        "ContactNo": this._sponserService.personalFormGroup.get('ContactNo').value || 0,
        "PinCode": this._sponserService.personalFormGroup.get('PinCode').value || '',
        "State": this._sponserService.personalFormGroup.get('State').value || '',
        "StateCode": this._sponserService.personalFormGroup.get('StateCode').value || '',
        "GSTIN": this._sponserService.personalFormGroup.get('GSTIN').value || 0,
        "SAC": this._sponserService.personalFormGroup.get('SAC').value || '',
        "PAN": this._sponserService.personalFormGroup.get('PAN').value || '',
        "PlaceOfSupply": this._sponserService.personalFormGroup.get('PlaceOfSupply').value || '',
        "EmailId": this._sponserService.personalFormGroup.get('EmailId').value || '',
        "updatedBy": this.accountService.currentUserValue.user.id
      }
    }
    console.log(m_data1);
    this._sponserService.UpdateSponserInformation(m_data1).subscribe(response => {
      if (response) {
        Swal.fire('Update Sponser Information Save !', ' Sponser Information Updated Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'MemberDetail not Updated', 'error');
      }
    });
  }

  }

  onClose(){
    
  }
}
