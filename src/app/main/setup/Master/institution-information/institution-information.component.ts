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
  sIsLoading: string = '';

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
      maxHeight: "55vh",
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



  
  onEdit(row) {
    console.log(row);
    var m_data = {
      InstitutionId:row.InstitutionId,
      InstitutionName:row.InstitutionName,
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
    this._InstitutionService.populateForm(m_data);

    const dialogRef = this._matDialog.open(
      NewInstitutionInformationComponent,

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
  
  /**
   * Constructor
   *
   * @param InstitutionInformation
   */
  constructor(InstitutionInformation) {
      {
          this.InstitutionId = InstitutionInformation.InstitutionId || 0;
          this.InstitutionName = InstitutionInformation.InstitutionName || "";
          this.Address = InstitutionInformation.Address || "";
          this.ContactNo = InstitutionInformation.ContactNo || '';
          this.PinCode = InstitutionInformation.PinCode || "";
          this.State = InstitutionInformation.State || "";
          this.StateCode = InstitutionInformation.StateCode || '';
          this.GSTIN = InstitutionInformation.GSTIN || "";
          this.SAC = InstitutionInformation.SAC || 0;
          this.PAN = InstitutionInformation.PAN || 0;
          this.PlaceOfSupply = InstitutionInformation.PlaceOfSupply || "";
          this.EmailId = InstitutionInformation.EmailId || "";
          this.IsActive = InstitutionInformation.IsActive || 0;
          this.CreatedBy = InstitutionInformation.CreatedBy || 0;
          this.CreatedOn = InstitutionInformation.CreatedOn || "";
          this.UpdatedBy = InstitutionInformation.UpdatedBy || 0;
          this.UpdatedOn = InstitutionInformation.UpdatedOn || "";
      }
  }
}
