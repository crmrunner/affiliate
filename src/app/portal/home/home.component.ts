import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import {Router} from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import * as con from '../../services/app.config';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
//import { forkJoin } from 'rxjs';  // RxJS 6 syntax

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dashBoardDetails: any;
  subscribedData: any = [];
  totalSubscriber: number = 0;
  crmRunnerFrontEndURL = con.crmForntEndUrl;
  showCopyBtn : boolean = true;
  totalCustomerPayment: number = 0;
  totalCommission: number = 0;
  sum: number = 20;
  start: number = 0;
  throttle = 300;  
  scrollDistance = 1;  
  scrollUpDistance = 2; 
  direction = "";
  subscriberArray: String[] = [];
  canProceed: boolean = true;
  
  constructor(private router: Router, private dashboardService : DashboardService, private clipboardApi: ClipboardService) {
    this.dashBoardDetails = {};
    this.subscribedData = [];
    this.sum = 20;
    //let token = this.gettoken();
  }

  ngOnInit(): void {
    this.getDashboardInfo();
    this.getSubscriberInfo();
  }

  getDashboardInfo() {  
    this.dashboardService.getDashboardInfo().subscribe({
      next: (res) => {
        if(!res.error) {
          this.dashBoardDetails = res.data;
          if(res.subscribedData) {
            this.totalSubscriber = res.subscribedData.length;
            for(let i=0; i<res.subscribedData.length; i++){
              if(res.subscribedData[i].customer_subscription_amount){
                this.totalCustomerPayment += res.subscribedData[i].customer_subscription_amount;
              }
              if(res.subscribedData[i].affiliate_commission){
                this.totalCommission += res.subscribedData[i].affiliate_commission;
              }
            }
          }
        }else {
          localStorage.removeItem("affiliateAuthToken");
          this.router.navigate(['/']);
        }
      },
      error: (e) => {
        localStorage.removeItem("affiliateAuthToken");
        this.router.navigate(['/']);
      }
    })
  }

  getSubscriberInfo() {    
    let param = {limit: this.sum, offset: this.start};
    this.dashboardService.getSubscriberInfo(param).subscribe({
      next: (res) => {
        if(!res.error) {
          this.dashBoardDetails = res.data;
          if(res.subscribedData) {
            this.subscribedData = res.subscribedData;
            if(res.subscribedData)
              this.addItems(this.start, this.sum);
            else
              this.canProceed = false;
          }
        }else {
          localStorage.removeItem("affiliateAuthToken");
          this.router.navigate(['/']);
        }
      },
      error: (e) => {
        localStorage.removeItem("affiliateAuthToken");
        this.router.navigate(['/']);
      }
    })
  }

  copyCode() {
    this.clipboardApi.copyFromContent(con.crmForntEndUrl + this.dashBoardDetails.referal_code);
    this.showCopyBtn = false;
    setTimeout(()=>{
      this.showCopyBtn = true;
    }, 2000)
  }

  addItems(index: number, sum: number) {  
    for (let i = index; i < sum; i++) {  
      //debugger 
      if(this.subscribedData[i]){
        this.subscriberArray.push(this.subscribedData[i]);  
        console.log('sub: ',i, this.subscriberArray[i]); 
      }       
  
    }  
  }

  onScrollDown() {  
    // add another 20 items
    console.log('scroll');
    if(!this.canProceed) {
      this.start = this.sum;
      this.sum += 20;  
      this.getSubscriberInfo();  
      this.direction = "down";
    }  
  }

}
