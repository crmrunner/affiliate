import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserModel } from '../../models/user/user';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileDetails: any;
  password: string = '';
  confPassword: string = '';
  currentPassword: string = '';
  showSpinner: boolean = false;
  validationErr: string = '';
  userModel: any;
  inactiveButton: boolean = false;
  serverErrorMsg: string = '';
  serverSuccessMsg: string = '';

  constructor(private router: Router, private dashboardService : DashboardService, private authService: AuthService, private route: ActivatedRoute) {
    this.userModel = new UserModel('','','','');
    this.profileDetails = {};
  }

  ngOnInit(): void {
    this.getProfileInfo();
  }

  getProfileInfo() {  
    this.dashboardService.getDashboardInfo().subscribe({
      next: (res) => {
        if(!res.error) {
          console.log('profile: ', res.data);
          this.profileDetails = res.data;
        }
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  resetPassword(){
      let param: any = {'current_password': this.userModel.currentPassword, 'new_pwd': this.userModel.password, 'conf_new_pwd': this.userModel.confPassword};
      console.log('param: ', param);
      this.authService.changePassword(param).subscribe({
        next: (res) => {
          console.log('Login Res', res);
          //this.submitted = true;
          if(!!res.success){
            this.serverSuccessMsg = res.message;
            this.serverErrorMsg = '';
            setTimeout(()=> {
              this.serverSuccessMsg = '';
              this.userModel = {};
            }, 3000)
          }else {
            this.serverErrorMsg = res.message;
          }
        },
        error: (e) => {
          this.serverErrorMsg = e.error.message;
          console.log(e.error.message);
        }
      });
  }

  matchPassword() {
    console.log(this.userModel.password, this.userModel.confPassword)
    if(this.userModel.confPassword && this.userModel.password) {
      if(this.userModel.password===this.userModel.confPassword){
        this.inactiveButton = false;
        this.serverErrorMsg = '';
      }else{
        this.inactiveButton = true;
        this.serverErrorMsg = 'Confirm password is wrong';
      }
    }else {
      this.serverErrorMsg = '';
    }
  }

}
