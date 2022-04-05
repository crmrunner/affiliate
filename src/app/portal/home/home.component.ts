import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import {Router} from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import * as con from '../../services/app.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dashBoardDeatils: any;
  subscribedData: any;
  crmRunnerFrontEndURL = con.crmForntEndUrl;
  showCopyBtn : boolean = true;
  constructor(private router: Router, private dashboardService : DashboardService, private clipboardApi: ClipboardService) {
    this.dashBoardDeatils = {};
    this.subscribedData = [];
    let token = this.gettoken();
    this.getDashboardInfo();
    // if(!!token) {
    //   this.getDashboardInfo();
    // }else {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
  }

  getDashboardInfo() {
    this.dashboardService.getDashboardInfo().subscribe({
      next: (res) => {
        if(!res.error) {
          this.dashBoardDeatils = res.data;
          if(res.subscribedData) {
            console.log('subscribedData: ', res.subscribedData);
            this.subscribedData = res.subscribedData;
          }
        }else {
          localStorage.removeItem("affiliateAuthToken");
          this.router.navigate(['/']);
        }
        
        console.log('dashboard Res', res.data);
        //this.submitted = true;
        // if(!!res.status){
        //   localStorage.setItem('affiliateAuthToken', res.token);
        //   this.router.navigate(['/portal']);
        // }
      },
      error: (e) => {
        //this.validationErr = e.error.message;
        //console.log('dashboard error ', e.error.message);
        localStorage.removeItem("affiliateAuthToken");
        this.router.navigate(['/']);
      }
    })
  }

  copyCode() {
    this.clipboardApi.copyFromContent(con.crmForntEndUrl + this.dashBoardDeatils.referal_code);
    this.showCopyBtn = false;
    setTimeout(()=>{
      this.showCopyBtn = true;
    }, 2000)
  }

  gettoken(){
    return localStorage.getItem('affiliateAuthToken');
  }

}
