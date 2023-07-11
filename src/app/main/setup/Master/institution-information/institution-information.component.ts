import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InstitutionInformationService } from './institution-information.service';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { NewInstitutionInformationComponent } from './new-institution-information/new-institution-information.component';

@Component({
  selector: 'app-institution-information',
  templateUrl: './institution-information.component.html',
  styleUrls: ['./institution-information.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class InstitutionInformationComponent implements OnInit {
  isLoading = true;

  displayedColumns: string[] = [
    "InstitutionId", 
    "InstitutionName",  
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

  DSInstitutionInformationList = new MatTableDataSource<InstitutionInformation>();

  constructor(
    public _InstitutionService: InstitutionInformationService,
    public _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getServiceMasterList();
  }

  onAdd(){
    const dialogRef = this._matDialog.open(NewInstitutionInformationComponent, {
      maxWidth: "80vw",
      maxHeight: "95vh",
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
    var Params = {
      "InstitutionName": '%',
    };
    this._InstitutionService.getInstitutionInformationList(Params).subscribe(
      (Menu) => {
        this.DSInstitutionInformationList.data = Menu as InstitutionInformation[];
        // console.log(this.DSInstitutionInformationList.data);
        this.isLoading = false;
        this.DSInstitutionInformationList.sort = this.sort;
        this.DSInstitutionInformationList.paginator = this.paginator;
      },
      (error) => (this.isLoading = false)
    );
  }
}

export class InstitutionInformation {
  InstitutionId: number;
  InstitutionName: string;
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
          this.InstitutionId = SponserInformation.InstitutionId || 0;
          this.InstitutionName = SponserInformation.InstitutionName || "";
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
