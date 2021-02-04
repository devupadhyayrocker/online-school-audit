import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../shared/services/auth/authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  providers: [AuthenticationService]
})
export class AdminLoginComponent implements OnInit {
  loginForm = {
    username: '',
    password: ''
  }


  constructor(private authService: AuthenticationService,
    private router: Router) { 
      let isLogin = localStorage.getItem('token');
      if(isLogin){
      this.router.navigate(['/admin_dashboard'])
    } }

  ngOnInit() {
  }

  doLogin(logForm) {
    let loginDetails = {
      username: logForm.form.value.username,
      password: logForm.form.value.password
    }
    this.authService.getadminData(loginDetails).subscribe(res => {
      if (res['success']) {
        localStorage.setItem("token", res['token']);
        localStorage.setItem("userId", res['data'][0]._id);
        localStorage.setItem("role",res['data'][0].role);
        if (res['data'][0].role=='admin'){
          this.router.navigate(['/admin_dashboard']);
        }
      }
      console.log("res", res);
    }, err => {
      console.log("res", err);
    })


    console.log("test", logForm);
  }


}
