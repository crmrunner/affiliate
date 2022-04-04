import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../../../models/user/user';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  username: string = '';
  showSpinner: boolean = false;
  validationErr: string = '';
  userModel: any;
  successMsg: string = '';
  constructor(public activeModal: NgbActiveModal,  private authService: AuthService) { 
    this.userModel = new UserModel('','','');
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  resetPassword(){
    console.log("DataComes ::",this.userModel);
    let param: any = {'email': this.userModel.username};
    console.log('param: ', param);
    this.authService.forgotPassword(param).subscribe({
      next: (res) => {
        console.log('Login Res', res);
        if(res.success){
          this.successMsg = res.message;
          setTimeout(() => {
            this.closeModal();
          }, 3000);
        }else {
          this.validationErr = res.message;
        }
      },
      error: (e) => {
        this.validationErr = e.error.message;
        console.log(e.error.message);
      }
    })
  }

}
