import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MemberDetail, NewMemberMasterComponent } from './new-member-master/new-member-master.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MemberMasterService } from './member-master.service';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-master',
  templateUrl: './member-master.component.html',
  styleUrls: ['./member-master.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MemberMasterComponent implements OnInit {

  isLoading = true;
  sIsLoading: string = '';
  hasSelectedContacts: boolean;
  chargeslist: any = [];
  displayedColumns: string[] = [
    "MemberId",
    "FirstName",
    "MiddleName",
    "LastName",
    "Member_Address",
    "CityId",
    "PinCode",
    "MobileNo",
    "EmailId",
    "StudyAmount",
    "action",
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  MemberList = new MatTableDataSource<MemberDetail>();

  constructor(
    public _MemberMasterService: MemberMasterService,
    public _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    var Params = {
      "F_Name": '%',
      "L_Name": '%',
    };
    this._MemberMasterService.getMemberList(Params).subscribe(
      (Menu) => {
        this.MemberList.data = Menu as MemberDetail[];
        this.chargeslist = Menu as MemberDetail[];
        this.isLoading = false;
        this.MemberList.sort = this.sort;
        this.MemberList.paginator = this.paginator;
      },
      (error) => (this.isLoading = false)
    );
  }

  onAdd() {
    const dialogRef = this._matDialog.open(NewMemberMasterComponent, {
      maxWidth: "70vw",
      maxHeight: "50vh",
      width: "100%",
      height: "100%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getMemberMasterList();
    });
  }
  onClose() {

  }


  onClear() {
    this._MemberMasterService.myFilterform.reset(
      {
        // start: [],
        // end: []
      }
    );
  }


  getMemberMasterList() {
    var Params = {
      "F_Name": this._MemberMasterService.myFilterform.get("FirstName").value + '%' || '%',
      "L_Name":  this._MemberMasterService.myFilterform.get("LastName").value + '%' || '%',
    };
    this._MemberMasterService.getMemberList(Params).subscribe(
      (Menu) => {
        this.MemberList.data = Menu as MemberDetail[];
        this.chargeslist= Menu as MemberDetail[];
        this.isLoading = false;
        this.MemberList.sort = this.sort;
        this.MemberList.paginator = this.paginator;
      },
      (error) => (this.isLoading = false)
    );
  }


  deleteTableRow(element) {
    let index = this.chargeslist.indexOf(element);
    // if (index >= 0) {
    //   this.chargeslist.splice(index, 1);
    //   this.MemberList.data = [];
    //   this.MemberList.data = this.chargeslist;
    // }
   

    let Query = "Update  M_MemberMaster set IsActive=0 where  MemberId=" + element.MemberId + " ";
    console.log(Query)
      this._MemberMasterService.getdeletemember(Query).subscribe(data => {
       if(data)
       Swal.fire('Success !', 'List Row is Deactivate Successfully', 'success');

      });
  }


  onEdit(row) {
    console.log(row);
    var m_data = {
      MemberId: row.MemberId,
      FirstName: row.FirstName,
      MiddleName: row.MiddleName,
      LastName: row.LastName,
      Member_Address: row.Member_Address,
      CityId: row.CityId,
      PinCode: row.PinCode,
      MobileNo: row.MobileNo,
      EmailId: row.EmailId,
      StudyAmount: row.StudyAmount,
    };

    console.log(m_data);
    this._MemberMasterService.populateForm(m_data);

    const dialogRef = this._matDialog.open(
      NewMemberMasterComponent,

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
      this.getMemberMasterList();
    });
  }
}

