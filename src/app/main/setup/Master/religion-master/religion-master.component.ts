import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReligionMAsterService } from './religion-master.service';
import Swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-religion-master',
  templateUrl: './religion-master.component.html',
  styleUrls: ['./religion-master.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ReligionMasterComponent implements OnInit {

  msg: any;

  displayedColumns: string[] = [
      "ReligionId",
      "ReligionName",
      "AddedByName",
      "IsDeleted",
      "action",
  ];

  DSReligionMasterList = new MatTableDataSource<ReligionMaster>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public _religionService: ReligionMAsterService) {}

  ngOnInit(): void {
      this.getReligionMasterList();
  }
  onSearch() {
      this.getReligionMasterList();
  }

  onSearchClear() {
      this._religionService.myformSearch.reset({
          ReligionNameSearch: "",
          IsDeletedSearch: "2",
      });
  }
  getReligionMasterList() {
      var m_data = {
          ReligionName:
              this._religionService.myformSearch.get("ReligionNameSearch")
                  .value + "%" || "%",
      };
      this._religionService
          .getReligionMasterList(m_data)
          .subscribe((Menu) => {
              this.DSReligionMasterList.data = Menu as ReligionMaster[];
              this.DSReligionMasterList.sort = this.sort;
              this.DSReligionMasterList.paginator = this.paginator;
          });
  }

  onClear() {
      this._religionService.myform.reset({ IsDeleted: "false" });
      this._religionService.initializeFormGroup();
  }

  onSubmit() {
      if (this._religionService.myform.valid) {
          if (!this._religionService.myform.get("ReligionId").value) {
              var m_data = {
                  religionMasterInsert: {
                    religionName: this._religionService.myform
                          .get("ReligionName")
                          .value.trim(),
                      CreatedBy: 1,
                     
                  },
              };

              this._religionService
                  .religionMasterInsert(m_data)
                  .subscribe((data) => {
                      this.msg = data;
                      if (data) {
                          Swal.fire(
                              "Saved !",
                              "Record saved Successfully !",
                              "success"
                          ).then((result) => {
                              if (result.isConfirmed) {
                                  this.getReligionMasterList();
                              }
                          });
                      } else {
                          Swal.fire(
                              "Error !",
                              "Appoinment not saved",
                              "error"
                          );
                      }
                      this.getReligionMasterList();
                  });
          } else {
              var m_dataUpdate = {
                  religionMasterUpdate: {
                      religionID:
                          this._religionService.myform.get("ReligionId")
                              .value,
                      religionName: this._religionService.myform
                          .get("ReligionName")
                          .value.trim(),
                     
                    
                      updatedBy: 1,
                  },
              };

              this._religionService
                  .religionMasterUpdate(m_dataUpdate)
                  .subscribe((data) => {
                      this.msg = data;
                      if (data) {
                          Swal.fire(
                              "Updated !",
                              "Record updated Successfully !",
                              "success"
                          ).then((result) => {
                              if (result.isConfirmed) {
                                  this.getReligionMasterList();
                              }
                          });
                      } else {
                          Swal.fire(
                              "Error !",
                              "Appoinment not updated",
                              "error"
                          );
                      }
                      this.getReligionMasterList();
                  });
          }
          this.onClear();
      }
  }

  onEdit(row) {
      console.log(row);
      var m_data = {
          ReligionId: row.ReligionId,
          ReligionName: row.ReligionName.trim(),
          IsDeleted: JSON.stringify(row.IsDeleted),
          UpdatedBy: row.UpdatedBy,
      };
      this._religionService.populateForm(m_data);
  }
}

export class ReligionMaster {
  ReligionId: number;
  ReligionName: string;
  IsDeleted: boolean;
  AddedBy: number;
  UpdatedBy: number;
  AddedByName: string;

  /**
   * Constructor
   *
   * @param ReligionMaster
   */
  constructor(ReligionMaster) {
      {
          this.ReligionId = ReligionMaster.ReligionId || "";
          this.ReligionName = ReligionMaster.ReligionName || "";
          this.IsDeleted = ReligionMaster.IsDeleted || "false";
          this.AddedBy = ReligionMaster.AddedBy || "";
          this.UpdatedBy = ReligionMaster.UpdatedBy || "";
          this.AddedByName = ReligionMaster.AddedByName || "";
      }
  }
}
