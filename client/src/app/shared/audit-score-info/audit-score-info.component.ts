import { AppConfig } from './../config/app.config';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-audit-score-info',
  templateUrl: './audit-score-info.component.html',
  styleUrls: ['./audit-score-info.component.css']
})
export class AuditScoreInfoComponent implements OnInit, AfterViewInit {

  staffData: any = [];
  scl_name: string = "";
  princi_name : string = "";
  filteredTeachingData: number = 0;
  filteredNonTeachingData: number = 0;
  @ViewChild('openModal', { static: false }) modal: ElementRef;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getStaffList();
    this.getPrincipalBySchoolId();
    if (localStorage.getItem('name')) {
      this.scl_name = localStorage.getItem('name');
    }
  }

  getPrincipalBySchoolId(){
    this.commonService.getPrincipalBySchoolId().subscribe(res=>{
      if (res['data']){
        this.princi_name = res['data'][0].name;
      console.log("principal",res['data']);
      }
    })
  }
  
  
  getStaffList() {
    this.commonService.getStaffList().subscribe(res => {
      if (res['data']) {
        this.staffData = res['data'];
        console.log("staffnum",this.staffData.length);
        let filteredTeachingData = this.staffData.filter(item => {
          if (item.isTeaching && item.isteachPeerSubmitted && item.isteachSelfSubmitted) {
            return true
          } else {
            return false
          }
        })
        this.filteredTeachingData = filteredTeachingData.length;

        let filteredNonTeachingData = this.staffData.filter(item=>{
          if (!item.isTeaching && item.isnonTeachPeerSubmitted && item.isnonTeachSelfSubmitted){
            return true
          } else {
            return false
          }
        })
        this.filteredNonTeachingData = filteredNonTeachingData.length;
        console.log("yyyy", filteredNonTeachingData.length);
      }
    }, err => { })
  }

  ngAfterViewInit() {
    this.modal.nativeElement.click();
  }

}
