import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { DashboardService } from '../dashboard.service';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CaseIdDetailComponent } from '../case-id-detail/case-id-detail.component';

@Component({
  selector: 'app-daily-dashboard',
  templateUrl: './daily-dashboard.component.html',
  styleUrls: ['./daily-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DailyDashboardComponent implements OnInit {

  dashbardCardData : any = [];
  username :any;
  
  DashChartIP: any = [];
  DashChartOP: any = [];
  
  isLoadingArr = ['0', '0', '0'];
  pieChartOPData = new PieChartOPData();
  pieChartData = new PieChartData();
  tableCurrentRange: any;
  
  constructor(
    public _dashboardServices: DashboardService,
    public _accountServices: AuthenticationService,
    public _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.username = this._accountServices.currentUserValue.user
      ? this._accountServices.currentUserValue.user.firstName + ' ' + this._accountServices.currentUserValue.user.lastName
      : '';

    this.getDashboardSummary();
    // this.getOPChartData();
    // this.getIPChartData();

    this.tableCurrentRange = this.pieChartData.currentRange;
  }

  public getDashboardSummary() {
    this._dashboardServices.getDailyDashboardSummary().subscribe(data => {
      this.dashbardCardData = data;
      console.log(this.dashbardCardData);
    });
  }
  
  showOPDayGroupWiseSummary(){

  }

  
  
  newCaseDetail(element) {
    console.log(element);
    const dialogRef = this._matDialog.open(CaseIdDetailComponent,
      {
        maxWidth: "65vw",
        height: '600px',
        width: '100%',
        data : {
          StudyId : element.Title,
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      
    });
  }
 
}

export class PieChartData {
  currentRange = 'Todays';
  mainChart = {
    'Todays': [],
    'Last Weeks': [],
    'Last Month': []
  };
  footerLeft = {
    title: '',
    count: 0
  };
  footerRight = {
    title: '',
    count: 0
  };
}

export class PieChartOPData {
  currentRange = 'Todays';
  mainChart = {
    'Todays': [],
    'Last Weeks': [],
    'Last Month': []
  };
  footerLeft = {
    title: '',
    count: 0
  };
  footerRight = {
    title: '',
    count: 0
  };
}