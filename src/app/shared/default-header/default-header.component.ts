import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.css']
})
export class DefaultHeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.logOut().subscribe({
      next: (res) => {
        if(res.status) {
          localStorage.removeItem("affiliateAuthToken");
          this.router.navigate(['/']);
        }
        
        console.log('logout Res', res.data);
        //this.submitted = true;
        // if(!!res.status){
        //   localStorage.setItem('affiliateAuthToken', res.token);
        //   this.router.navigate(['/portal']);
        // }
      },
      error: (e) => {
        //this.validationErr = e.error.message;
        console.log('logout error ', e.error.message);
      }
    })
  }

}
