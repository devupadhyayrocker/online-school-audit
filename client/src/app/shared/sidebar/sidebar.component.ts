import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [AuthenticationService]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;
  currentRole: string = "";
  currentUrl: string = "";
  pr_name: string = "";
  teacherData: any = [];
  isTeachingSelfReviewed: boolean = false;
  isTeachingPeerReviewed: boolean = false;
  isTeachingDocReviewed: boolean = false;
  isNonTeachingSelfReviewed: boolean = false;
  isNonTeachingPeerReviewed: boolean = false;
  constructor(private authService: AuthenticationService, private router: Router, private commonService: CommonService) {



    this.router.events.subscribe(event => {
      this.currentRole = this.authService.getCurrentRole();
      if (event.constructor.name === "NavigationEnd") {
        console.log("yy", localStorage.getItem('name'));
        this.pr_name = localStorage.getItem('name');
        console.log("url", event['url']);
        this.currentUrl = event['url'] == '/' ? '/login' : event['url'];
        let isLogin = localStorage.getItem('token');
        if (isLogin) {
          this.isLoggedIn = true;
        }
      }

    })
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    let ROLE = localStorage.getItem('role');
    if(ROLE && ROLE!=='admin'){
      console.log("admin call",this.currentRole);
      this.getStaffById();
    }
    if (localStorage.getItem('name')) {
      this.pr_name = localStorage.getItem('name');
    }
    console.log("sidebar_url", this.currentUrl);
  }

  getStaffById() {
    this.commonService.getStaffById().subscribe(res => {
      if (res['data']) {
        this.teacherData = res['data'];
        this.isTeachingSelfReviewed = this.teacherData[0].isteachSelfSubmitted;
        this.isTeachingPeerReviewed = this.teacherData[0].isteachPeerSubmitted;
        this.isTeachingDocReviewed = this.teacherData[0].isDocSubmitted;
        this.isNonTeachingSelfReviewed = this.teacherData[0].isnonTeachSelfSubmitted;
        this.isNonTeachingPeerReviewed = this.teacherData[0].isnonTeachPeerSubmitted;
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  doLogOut() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/login'])
  }


}
