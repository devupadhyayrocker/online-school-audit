import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-non-teaching',
  templateUrl: './non-teaching.component.html',
  styleUrls: ['./non-teaching.component.css']
})
export class NonTeachingComponent implements OnInit {

  teacherData: any = [];

  constructor(private commonService: CommonService, private router:Router) { }

  ngOnInit() {
    this.getStaffById();
  }


  startevaluation() {
    if (this.teacherData.isSelfSubmitted) {
      if(this.teacherData.isPeerSubmitted){

      }
      else{
        this.router.navigate(['/nonteaching_peer_assessment'])   
      }
    }else{
      this.router.navigate(['/nonteaching_self_assessment'])
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
