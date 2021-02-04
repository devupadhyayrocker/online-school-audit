import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../shared/services/auth/authentication.service';

@Component({
  selector: 'app-editor-login',
  templateUrl: './editor-login.component.html',
  styleUrls: ['./editor-login.component.css'],
  providers: [AuthenticationService]
})
export class EditorLoginComponent implements OnInit {
  loginForm = {
    username: '',
    password: ''
  }


  constructor(private authService: AuthenticationService,
    private router: Router) { 
      let isLogin = localStorage.getItem('token');
      if(isLogin){
      this.router.navigate(['/teacher_academic_assessment'])
    } }

  ngOnInit() {
  }

  doLogin(logForm) {
    let loginDetails = {
      username: logForm.form.value.username,
      password: logForm.form.value.password
    }
    this.authService.geteditorData(loginDetails).subscribe(res => {
      if (res['success']) {
        localStorage.setItem("token", res['token']);
        localStorage.setItem("userId", res['data'][0]._id);
        localStorage.setItem("role",res['data'][0].role);
        if (res['data'][0].role=='editor'){
          this.router.navigate(['/teacher_academic_assessment']);
        }
      }
      console.log("res", res);
    }, err => {
      console.log("res", err);
    })


    console.log("test", logForm);
  }


}
