import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../shared/services/auth/authentication.service';

@Component({
  selector: 'app-school-login',
  templateUrl: './school-login.component.html',
  styleUrls: ['./school-login.component.css'],
  providers: [AuthenticationService]
})
export class SchoolLoginComponent implements OnInit {
  loginForm = {
    username: '',
    password: ''
  }


  constructor(private authService: AuthenticationService,
    private router: Router) {
    let isLogin = localStorage.getItem('token');
    if (isLogin) {
      this.router.navigate(['/audit_score_info'])
    }  }

  ngOnInit() {

  }

  doLogin(logForm) {
    let loginDetails = {
      username: logForm.form.value.username,
      password: logForm.form.value.password
    }
    this.authService.getpromoterData(loginDetails).subscribe(res => {
      if (res['success']) {
        console.log(res);
        localStorage.setItem("token", res['token']);
        localStorage.setItem("schoolId", res['data'][0]._id);
        localStorage.setItem("role", res['data'][0].role);
        localStorage.setItem("name", res['data'][0].schoolName);
        if (res['data'][0].role == 'promoter') {
          this.router.navigate(['/audit_score_info']);
        }
      }
      console.log("res", res);
    }, err => {
      console.log("res", err);
    })


    console.log("test", logForm);
  }

}
