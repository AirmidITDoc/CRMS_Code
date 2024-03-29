import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BankMasterService } from './bank-master.service';
import { fuseAnimations } from '@fuse/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank-master',
  templateUrl: './bank-master.component.html',
  styleUrls: ['./bank-master.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BankMasterComponent implements OnInit {

  PrefixMasterList: any;
  GendercmbList: any = [];
  msg: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
      "BankId",
      "BankName",
    //   "AddedByName",
      "IsDeleted",
      "action",
  ];

  DSBankMasterList = new MatTableDataSource<BankMaster>();

  constructor(public _bankService: BankMasterService) {}

  ngOnInit(): void {
      this.getBankMasterList();
      this._bankService.myform.get("IsDeleted").setValue(true);
  }
  onSearch() {
      this.getBankMasterList();
  }

  onSearchClear() {
      this._bankService.myformSearch.reset({
          BankNameSearch: "",
          IsDeletedSearch: "2",
      });
  }
  IsActiveStatus: any;
  onChangeIsactive(SiderOption) {
      this.IsActiveStatus = SiderOption.checked;
      console.log(this.IsActiveStatus);
  }

  getBankMasterList() {
      var param = {
          BankName: this._bankService.myformSearch.get('BankNameSearch').value + '%' || "%",
      };
      this._bankService.getBankMasterList(param).subscribe((Menu) => {
          this.DSBankMasterList.data = Menu as BankMaster[];
          this.DSBankMasterList.sort = this.sort;
          this.DSBankMasterList.paginator = this.paginator;
      });
  }

  onClear() {
      this._bankService.myform.reset({ IsDeleted: "true" });
      this._bankService.initializeFormGroup();
  }

  onSubmit() {
      if (this._bankService.myform.valid) {
          if (!this._bankService.myform.get("BankId").value) {
              var m_data = {
                  bankMasterInsert: {
                      bankName: this._bankService.myform
                          .get("BankName")
                          .value.trim(),
                      isDeleted: JSON.parse(
                          this._bankService.myform.get("IsDeleted").value
                      ),
                      addedBy: 1,
                  },
              };

              console.log(m_data);
              this._bankService.bankMasterInsert(m_data).subscribe((data) => {
                  this.msg = data;
                  if (data) {
                    Swal.fire(
                        "Saved !",
                        "Record saved Successfully !",
                        "success"
                    ).then((result) => {
                        if (result.isConfirmed) {
                            this.getBankMasterList();
                        }
                    });
                } else {
                    Swal.fire(
                        "Error !",
                        "Bank Name not saved",
                        "error"
                    );
                }
                  this.getBankMasterList();
              });
          } else {
              var m_dataUpdate = {
                  bankMasterUpdate: {
                      bankID: this._bankService.myform.get("BankId").value,
                      bankName:
                          this._bankService.myform.get("BankName").value,
                      isDeleted: JSON.parse(
                          this._bankService.myform.get("IsDeleted").value
                      ),
                      updatedBy: 1,
                  },
              };
              console.log(m_dataUpdate);
              this._bankService
                  .bankMasterUpdate(m_dataUpdate)
                  .subscribe((data) => {
                      this.msg = data;
                      if (data) {
                        Swal.fire(
                            "Updated !",
                            "Record Updated Successfully !",
                            "success"
                        ).then((result) => {
                            if (result.isConfirmed) {
                                this.getBankMasterList();
                            }
                        });
                    } else {
                        Swal.fire(
                            "Error !",
                            "Bank Name not saved",
                            "error"
                        );
                    }
                      this.getBankMasterList();
                  });
          }
          this.onClear();
      }
  }

  deleteTableRow(element) {
    let Query = "Update  M_BankMaster set IsActive=0 where  BankId=" + element.BankId + " ";
    console.log(Query)
      this._bankService.getdeletemember(Query).subscribe(data => {
       if(data)
       Swal.fire('Success !', 'List Row is Deactivate Successfully', 'success');

      });
  }
  onEdit(row) {
      var m_data = {
          BankId: row.BankId,
          BankName: row.BankName.trim(),
          IsDeleted: JSON.stringify(row.IsDeleted),
          UpdatedBy: row.UpdatedBy,
      };
      this._bankService.populateForm(m_data);
  }
}

export class BankMaster {
  BankId: number;
  BankName: string;
  IsDeleted: boolean;
  AddedBy: number;
  UpdatedBy: number;
  AddedByName: string;

  /**
   * Constructor
   *
   * @param BankMaster
   */
  constructor(BankMaster) {
      {
          this.BankId = BankMaster.BankId || "";
          this.BankName = BankMaster.BankName || "";
          this.IsDeleted = BankMaster.IsDeleted || "false";
          this.AddedBy = BankMaster.AddedBy || "";
          this.UpdatedBy = BankMaster.UpdatedBy || "";
          this.AddedByName = BankMaster.AddedByName || "";
      }
  }
}
