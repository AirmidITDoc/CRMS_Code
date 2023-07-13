import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SponserService } from './sponser.service';
import { fuseAnimations } from '@fuse/animations';
import { NewsponserinformationComponent } from './newsponserinformation/newsponserinformation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sponser-information',
  templateUrl: './sponser-information.component.html',
  styleUrls: ['./sponser-information.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,

})
export class SponserInformationComponent implements OnInit {
  isLoading = true;

  displayedColumns: string[] = [
    "SponserId", 
    "SponserName",  
    "Address", 
    "ContactNo",  
    "PinCode", 
    "State",  
    "StateCode", 
    "GSTIN", 
    "SAC", 
    "PAN", 
    "PlaceOfSupply", 
    "EmailId", 
    "IsActive", 
    // "CreatedBy", 
    // "CreatedOn", 
    // "UpdatedBy", 
    // "UpdatedOn", 
    "action",
];
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

DSSponserInformationList = new MatTableDataSource<SponserInformation>();

  constructor(
    public _sponserService: SponserService,
    public _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getServiceMasterList();
  }

  onAdd(){
    const dialogRef = this._matDialog.open(NewsponserinformationComponent, {
      maxWidth: "80vw",
      maxHeight: "65vh",
      width: "100%",
      height: "100%",
  });
  dialogRef.afterClosed().subscribe((result) => {
      this.getServiceMasterList();
  });
  }
  onClose(){
    
  }
  getServiceMasterList() {
    var Params={
            "SponserName":'%',       
    };
    this._sponserService.getSponserInformationList(Params).subscribe(
        (Menu) => {
            this.DSSponserInformationList.data = Menu as SponserInformation[];
            console.log(this.DSSponserInformationList.data);
            this.isLoading = false;
            this.DSSponserInformationList.sort = this.sort;
            this.DSSponserInformationList.paginator = this.paginator;
        },
        (error) => (this.isLoading = false)
    );
}


onEdit(row) {
  console.log(row);
  var m_data = {
    SponserId:row.SponserId,
    SponserName:row.SponserName,
    Address:row.Address,
    ContactNo:row.ContactNo,
    PinCode:row.PinCode,
    State:row.State,
    StateCode: row.StateCode,
    GSTIN: row.GSTIN,
    SAC: row.SAC,
    PAN: row.PAN,
    PlaceOfSupply:row.PlaceOfSupply,
    EmailId: row.EmailId,
    IsActive: row.IsActive,
    CreatedBy:row.CreatedBy,
    CreatedOn: row.CreatedOn,
    UpdatedBy: row.UpdatedBy,
    UpdatedOn:row.UpdatedOn,
  };

  console.log(m_data);
  this._sponserService.populateForm(m_data);

  const dialogRef = this._matDialog.open(
    NewsponserinformationComponent,

    {
      maxWidth: "70vw",
      maxHeight: "55vh",
      width: "100%",
      height: "100%",
      // data : {
      //   registerObj : m_data,
      // }
    }
  );

  dialogRef.afterClosed().subscribe((result) => {
    console.log("The dialog was closed - Insert Action", result);
    this.getServiceMasterList();
  });
}

}

export class SponserInformation {
  SponserId: number;
  SponserName: string;
  Address: string;
  ContactNo: string;
  PinCode: string;
  State: string;
  StateCode: string;
  GSTIN: string;
  SAC: string;
  PAN: string;
  PlaceOfSupply: string;
  EmailId: string;
  IsActive: boolean;
  CreatedBy: number;
  CreatedOn: Date;
  UpdatedBy: number;
  UpdatedOn: Date;
  // IsDocEditable: boolean;
  // AddedBy: number;
  // UpdatedBy: number;
  // AddedByName: string;
  // currentDate = new Date();
  // EffectiveDate:any;
  /**
   * Constructor
   *
   * @param SponserInformation
   */
  constructor(SponserInformation) {
      {
          this.SponserId = SponserInformation.SponserId || 0;
          this.SponserName = SponserInformation.SponserName || "";
          this.Address = SponserInformation.Address || "";
          this.ContactNo = SponserInformation.ContactNo || 0;
          this.PinCode = SponserInformation.PinCode || "";
          this.State = SponserInformation.State || "";
          this.StateCode = SponserInformation.StateCode || 0;
          this.GSTIN = SponserInformation.GSTIN || "";
          this.SAC = SponserInformation.SAC || 0;
          this.PAN = SponserInformation.PAN || 0;
          this.PlaceOfSupply = SponserInformation.PlaceOfSupply || "false";
          this.EmailId = SponserInformation.EmailId || "";
          this.IsActive = SponserInformation.IsActive || 0;
          this.CreatedBy = SponserInformation.CreatedBy || 0;
          this.CreatedOn = SponserInformation.CreatedOn || "";
          this.UpdatedBy = SponserInformation.UpdatedBy || 0;
          this.UpdatedOn = SponserInformation.UpdatedOn || "";
      }
  }
}
