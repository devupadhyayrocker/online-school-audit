import { AuthenticationService } from './../../shared/services/auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  loginForm = {
    username: '',
    password: ''
  }



  constructor(
    private authService: AuthenticationService,
    private router: Router
    
  ) {}

  ngOnInit() {
    
  }

  doLogin(logForm) {
    let loginDetails = {
      username: logForm.form.value.username,
      password: logForm.form.value.password
    }
    this.authService.getloginData(loginDetails).subscribe(res => {
      if (res['success']) {
        localStorage.setItem("token", res['token']);
        localStorage.setItem("userId", res['data'][0]._id);
        localStorage.setItem("schoolId", res['data'][0].schoolId);
        localStorage.setItem("role",res['data'][0].role);
        if (res['data'][0].role=='editor'){
          this.router.navigate(['/editor_dashboard']);
        }
        
        else if (res['data'][0].role=='principal'){
          this.router.navigate(['/principal_dashboard']);
        }

        else if (res['data'][0].role=='teaching'){
          this.router.navigate(['/teacher_dashboard']);
        }

        else if (res['data'][0].role=='nonteaching'){
          this.router.navigate(['/nonteaching_dashboard']);
        }


      }
      console.log("res", res);
    }, err => {
      console.log("res", err);
    })


    console.log("test", logForm);
  }


}
