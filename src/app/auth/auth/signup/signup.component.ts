import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MiscService } from '../../../services/misc/misc.service';
import { Affiliate } from '../../../models/affiliate/affiliate';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // genders = [
  //   {'name': 'Male', value: 'Male'},
  //   {'name': 'Female', value: 'Female'}
  // ]

  showOTP: boolean = false;
  serverErr: any = {};
  countries: any = [];
  phoneDialcode: string = '';
  mobileDialcode: string = '';
  passwordIsValid = false;
  showStrength= false;
  passWordMatched: boolean = true;
  showMessage: string = '';
  successMsg: string = '';

  f_name : string = '';
  l_name : string = '';
  email: string = '';
  mobile_countrycode: string = '';
  mobile_dialCode: string = '';
  mobile: string = '';
  phone_countrycode: string = '';
  phone_dialCode: string = '';
  phone: string = '';
  country: any = null;
  state: string = '';
  city: string = '';
  zip: string = '';
  address: string = '';
  street: string = '';
  //gender : any = null;
  accountType: any = null;
  routingNumber: string = '';
  accountNumber: string = '';
  nameOnAccount: string = '';
  bankName: string = '';
  echeckType: any = null;
  checkNumber: string = '';
  password: string = '';
  confPassword: string = '';
  acceptTerms: boolean = false;
  otp: string = '';
  countryCodeReadOnly: boolean = false;

  accountTypes = [
    { name: 'checking', value: 'Checking' },
    { name: 'savings', value: 'Savings' },
    { name: 'businessCheck', value: 'Business Checking' }
  ];

  eCheckTypes = [
    { name: 'ARC', value: 'ARC' },
    { name: 'BOC', value: 'BOC' },
    { name: 'CCD', value: 'CCD' },
    { name: 'PPD', value: 'PPD' },
    { name: 'TEL', value: 'TEL' },
    { name: 'WEB', value: 'WEB' },
  ];

  submitted = false;
  affiliateModel: any;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private miscService: MiscService, private router: Router) {
  }

  ngOnInit(): void {
    this.affiliateModel = new Affiliate(this.f_name,  this.l_name,  this.email,  this.mobile_countrycode,  this.mobile_dialCode,  this.mobile,  this.phone_countrycode,  this.phone_dialCode,  this.phone,  this.country,  this.state,  this.city,  this.zip,  this.address,  this.street,  '',  this.accountType,  this.routingNumber,  this.accountNumber,  this.nameOnAccount,  this.bankName,  this.echeckType,  this.checkNumber,  this.password,  this.confPassword, this.acceptTerms, this.otp);
    this.getCountries();
  }

  onSubmit(): void {
    console.log('ee');
    this.submitted = true;
    if (!this.affiliateModel) {
      console.log('inv');
      return;
    }

    if(!this.affiliateModel.phone){
      delete this.affiliateModel.phone_dialCode;
      delete this.affiliateModel.phone_countrycode;
      delete this.affiliateModel.phone;
    }
    console.log('this.form.value: ', this.affiliateModel);
    this.authService.registration(this.affiliateModel).subscribe({
      next: (res) => {
        console.log('Login Res', res);
        //this.submitted = true;
        this.showMessage = '';
        if(!!res.otpSent){
          this.showOTP = true;
          this.showMessage = res.message ? res.message : '';
        }else {
          this.showMessage = res.message ? res.message : '';
          if(res.success){
            this.showOTP = false;
            this.successMsg = res.message ? res.message : '';
            this.affiliateModel = {};
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          }else {
            if(this.affiliateModel.otp){
              this.showOTP = true;
            }else {
              this.showOTP = false;
              this.serverErr = res.data;
              // if(res.message.user){
              //   this.userErr = res.message.user;
              // }

              // if(res.message.pass){
              //   this.passErr = res.message.pass;
              // }

              // if(res.message.generic){
              //   this.genericErr = res.message.generic;
              // }
            }
          }
          
        }
      },
      error: (e) => {
        console.log(e.error.message);
        this.serverErr = e.error.message;
        // if(e.error.message.user){
        //   this.userErr = e.error.message.user;
        // }

        // if(e.error.message.pass){
        //   this.passErr = e.error.message.pass;
        // }

        // if(e.error.message.generic){
        //   this.genericErr = e.error.message.generic;
        // }
        
      }
    })
    console.log(JSON.stringify(this.affiliateModel, null, 2));
  }
  
  onReset(): void {
    this.submitted = false;
    this.serverErr = {};
    this.affiliateModel = {};
  }

  getCountries(): void {
    this.miscService.getCountries().subscribe({
      next: (res) => {      
        console.log('country res: ', res); 
          if(res.success){
            this.countries = res.data
          }else {
          }
      },
      error: (e) => {
        console.log(e.error.message);        
      }
    })
  }

  passwordValid(event: any) {
    console.log('event', event.target.value);
    this.showStrength = (event.target.value) ? true : false;
    this.passwordIsValid = event;
  }

  comparePassword() {
    console.log(this.affiliateModel.confPassword);
    if(this.affiliateModel.confPassword) {
      this.passWordMatched = (this.affiliateModel.confPassword === this.affiliateModel.password) ? true : false;
    }else {
      this.passWordMatched = true;
    }
  }
  
  getPhoneCode(e: any) {
    console.log('modelChanged: ', e);
    let countryDetail = [];
    countryDetail = this.countries.filter((data:any)=> data.name == e);
    if(countryDetail.length > 0){
      this.affiliateModel.mobile_dialCode = countryDetail[0].phonecode;
      this.countryCodeReadOnly = true;
    }else{
      this.affiliateModel.mobile_dialCode = '';
      this.countryCodeReadOnly = false;
    }
    console.log('countryDetail: ', countryDetail);
  }
}
