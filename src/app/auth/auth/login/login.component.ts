import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserModel } from '../../../models/user/user';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  showSpinner: boolean = false;
  validationErr: string = '';
  userModel: any;
  closeResult: string = '';
  modalOptions:NgbModalOptions;
  
  constructor(private router: Router, private authService: AuthService, public modalService: NgbModal) {
    let token = this.gettoken();
    console.log('token', token);
    // if(!!token) {
    //   this.router.navigate(['/portal']);
    // }
    this.userModel = new UserModel('','','','');

    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
   }
  ngOnInit(): void {
    
  }

  openModal() {
    this.modalService.open(ForgotPasswordComponent, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  doLogin(){
    console.log("DataComes ::",this.userModel);
    let param: any = {'username': this.userModel.username, 'password': this.userModel.password};
    console.log('param: ', param);
    this.authService.login(param).subscribe({
      next: (res) => {
        console.log('Login Res', res);
        //this.submitted = true;
        if(!!res.status){
          localStorage.setItem('affiliateAuthToken', res.token);
          this.router.navigate(['/portal']);
        }
      },
      error: (e) => {
        this.validationErr = e.error.message;
        console.log(e.error.message);
      }
    })
  }

  gettoken(){
    return localStorage.getItem('affiliateAuthToken');
   }

}
