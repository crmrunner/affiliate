import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserModel } from '../../../models/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../services/loading/loading.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  confPassword: string = '';
  showSpinner: boolean = false;
  validationErr: string = '';
  userModel: any;
  resetPassToken: any;
  inValidResetToken: boolean = false;
  inactiveButton: boolean = false;
  serverErrorMsg: string = '';
  serverSuccessMsg: string = '';

  loading$ = this.loader.loading$;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private loader: LoadingService) {
    this.userModel = new UserModel('','','','');
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.resetPassToken = params.get('id');
      if(!this.resetPassToken || this.resetPassToken == ''){
        this.inactiveButton = true;
        this.inValidResetToken = true;
        this.serverErrorMsg = 'User is not found!!';
      }
      console.log();
    });
  }

  resetPassword(){
    console.log("DataComes ::",this.userModel, this.inValidResetToken);
      if(!this.inValidResetToken) {
        let param: any = {'new_pwd': this.userModel.password, 'conf_new_pwd': this.userModel.confPassword};
      console.log('param: ', param);
      this.authService.resetPassword(param, this.resetPassToken).subscribe({
        next: (res) => {
          console.log('Login Res', res);
          //this.submitted = true;
          if(!!res.success){
            this.serverSuccessMsg = res.message;
            this.serverErrorMsg = '';
            setTimeout(()=> {
              this.router.navigate(['']);
            }, 3000)
          }else {
            this.serverErrorMsg = res.message;
          }
        },
        error: (e) => {
          this.serverErrorMsg = e.error.message;
          console.log(e.error.message);
        }
      })
    }else {
      this.inactiveButton = true;
    }
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
