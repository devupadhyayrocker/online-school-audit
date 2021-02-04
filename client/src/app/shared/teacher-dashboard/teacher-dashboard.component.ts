import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  teacherData: any = [];

  constructor(private commonService: CommonService, private router:Router) { }

  ngOnInit() {
    this.getStaffById();
  }

  startevaluation() {
    if (this.teacherData.isteachSelfSubmitted) {
      if(this.teacherData.isteachPeerSubmitted){

      }
      else{
        this.router.navigate(['/teacher_peer_assessment'])   
      }
    }else{
      this.router.navigate(['/teacher_self_assessment'])
    }

  }

  getStaffById(){
    this.commonService.getStaffById().subscribe(res => {
      if (res['data']) {
        this.teacherData = res['data'];
      }
    }, err => {
      console.log("Erere", err);
    })
  }


  



}
