import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserModel } from '../../models/user/user';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LoadingService } from '../../services/loading/loading.service';

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
  imgChangeEvt: any = '';
  imageSrc: string = '';
  images: any;
  successMsg: string = '';
  failureMsg: string = '';

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  loading$ = this.loader.loading$;

  constructor(private router: Router, private dashboardService : DashboardService, private authService: AuthService, private route: ActivatedRoute, private loader: LoadingService) {
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

  get f(){
    return this.myForm.controls;
  }
 
  onFileChange(event:any) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      console.log('event.target.files: ',event.target.files);
      const file = event.target.files[0];
      this.images = file;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.imageSrc = reader.result as string;
        console.log('reader.result: ',reader.result);
        // this.myForm.patchValue({
        //   file: this.images
        // });
    
      };
    
    }
  }
   
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log('this.images: ', this.images);
    if(!this.images){
      this.successMsg = '';
      this.failureMsg = 'Please upload the image';
    }
    else if(this.images.type != "image/jpeg" && this.images.type != "image/png") {
      this.successMsg = '';
      this.failureMsg = 'Please upload jpeg, jpg or png image';
    } else{
       //console.log('MyForm: ', this.myForm.value);
       const formData = new FormData();
       //console.log('this.myForm.controls: ', this.myForm.controls);
       formData.append('file', this.images);
       //let param = {'fileSource': this.myForm.value.fileSource};
       this.images = '';
       this.imageSrc = '';
       this.dashboardService.getProfilePictureInfo(formData).subscribe({
         next: (res) => {
           if(!res.error) {
             console.log('profile: ', res);
             this.profileDetails.propic = res.data;
             this.successMsg = res.message;
             this.failureMsg = '';
           }else {
             this.failureMsg = res.message;
             this.successMsg = '';
           }
         },
         error: (e) => {
           console.log(e);
         }
       });
    }
  
    this.myForm.reset();
    // this.http.post('http://localhost:8001/upload.php', this.myForm.value)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('Uploaded Successfully.');
    //   })
  }

}
