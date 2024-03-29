import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { ReplaySubject, Subject } from 'rxjs';
import { AreaMasterService } from './area-master.service';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-area-master',
  templateUrl: './area-master.component.html',
  styleUrls: ['./area-master.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AreaMasterComponent implements OnInit {

  AreaMasterList: any;
  CitycmbList: any = [];
  msg: any;
  chargeslist: any = [];
  // city filter
  public cityFilterCtrl: FormControl = new FormControl();
  public filteredCity: ReplaySubject<any> = new ReplaySubject<any>(1);

  private _onDestroy = new Subject<void>();

  displayedColumns: string[] = [
      "AreaId",
      "AreaName",
    //   "CityName",
    //   "AddedBy",
      "IsDeleted",
      "action",
  ];

  DSAreaMasterList = new MatTableDataSource<AreaMaster>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
      public _AreaService: AreaMasterService,
      private accountService: AuthenticationService
  ) {}

  ngOnInit(): void {
      this.getAreaMasterList();
      this.getCityNameCombobox();

      this.cityFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
              this.filterCity();
          });
  }

  onSearch() {
      this.getAreaMasterList();
  }

  onSearchClear() {
      this._AreaService.myformSearch.reset({
          AreaNameSearch: "",
          IsDeletedSearch: "2",
      });
  }
  private filterCity() {
      if (!this.CitycmbList) {
          return;
      }
      // get the search keyword
      let search = this.cityFilterCtrl.value;
      if (!search) {
          this.filteredCity.next(this.CitycmbList.slice());
          return;
      } else {
          search = search.toLowerCase();
      }
      // filter the banks
      this.filteredCity.next(
          this.CitycmbList.filter(
              (bank) => bank.CityName.toLowerCase().indexOf(search) > -1
          )
      );
  }

  getAreaMasterList() {
      var param = {
          AreaName: this._AreaService.myformSearch.get('AreaNameSearch').value + '%' || "%",
      };
      this._AreaService.getAreaMasterList(param).subscribe((Menu) => {
          this.DSAreaMasterList.data = Menu as AreaMaster[];
          this.chargeslist=Menu as AreaMaster[];
          this.DSAreaMasterList.sort = this.sort;
          this.DSAreaMasterList.paginator = this.paginator;
      });
  }

  getCityNameCombobox() {
      this._AreaService
          .getCityMasterCombo()
          .subscribe((data) => (this.CitycmbList = data));
  }

  onClear() {
      this._AreaService.myform.reset({ IsDeleted: "false" });
      this._AreaService.initializeFormGroup();
  }

  onSubmit() {
      if (this._AreaService.myform.valid) {
          if (!this._AreaService.myform.get("AreaId").value) {
              var m_data = {
                  areaMasterInsert: {
                      areaName: this._AreaService.myform
                          .get("AreaName")
                          .value.trim(),
                      CreatedBy: 10,
                    //   isDeleted: Boolean(
                    //       JSON.parse(
                    //           this._AreaService.myform.get("IsDeleted").value
                        //   )
                    //   ),
                  },
              };

              this._AreaService.areaMasterInsert(m_data).subscribe((data) => {
                  this.msg = data;
                  if (data) {
                      Swal.fire(
                          "Saved !",
                          "Record saved Successfully !",
                          "success"
                      ).then((result) => {
                          if (result.isConfirmed) {
                              this.getAreaMasterList();
                          }
                      });
                  } else {
                      Swal.fire("Error !", "Appoinment not saved", "error");
                  }
                  this.getAreaMasterList();
              });
          } else {
              var m_dataUpdate = {
                  areaMasterUpdate: {
                      areaId: this._AreaService.myform.get("AreaId").value,
                      areaName: this._AreaService.myform
                          .get("AreaName")
                          .value.trim(),
                      // CityId: this._AreaService.myform.get("CityId").value,
                    //   isDeleted: Boolean(
                    //       JSON.parse(
                    //           this._AreaService.myform.get("IsDeleted").value
                    //       )
                    //   ),
                      updatedBy: 1,
                  },
              };

              this._AreaService
                  .areaMasterUpdate(m_dataUpdate)
                  .subscribe((data) => {
                      this.msg = data;
                      if (data) {
                          Swal.fire(
                              "Updated !",
                              "Record updated Successfully !",
                              "success"
                          ).then((result) => {
                              if (result.isConfirmed) {
                                  this.getAreaMasterList();
                              }
                          });
                      } else {
                          Swal.fire(
                              "Error !",
                              "Appoinment not updated",
                              "error"
                          );
                      }
                      this.getAreaMasterList();
                  });
          }
          this.onClear();
      }
  }


  deleteTableRow(element) {
    let Query = "Update  M_AreaMaster set IsActive=0 where  AreaId=" + element.AreaId + " ";
    console.log(Query)
      this._AreaService.getdeletemember(Query).subscribe(data => {
       if(data)
       Swal.fire('Success !', 'List Row is Deactivate Successfully', 'success');

      });
  }



  onEdit(row) {
      var m_data = {
          AreaId: row.AreaId,
          AreaName: row.AreaName.trim(),
          CityId: row.CityId,
          IsDeleted: JSON.stringify(row.IsDeleted),
          UpdatedBy: row.UpdatedBy,
      };
      this._AreaService.populateForm(m_data);
  }
}

export class AreaMaster {
  AreaId: number;
  AreaName: string;
  CityId: number;
  IsDeleted: boolean;
  AddedBy: number;
  UpdatedBy: number;

  /**
   * Constructor
   *
   * @param AreaMaster
   */
  constructor(AreaMaster) {
      {
          this.AreaId = AreaMaster.AreaId || "";
          this.AreaName = AreaMaster.AreaName || "";
          this.CityId = AreaMaster.CityId || "";
          this.IsDeleted = AreaMaster.IsDeleted || "false";
          this.AddedBy = AreaMaster.AddedBy || "";
          this.UpdatedBy = AreaMaster.UpdatedBy || "";
      }
  }
}
