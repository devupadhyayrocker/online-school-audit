import { AppConfig } from './../config/app.config';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';
@Component({
  selector: 'app-individual-audit-report',
  templateUrl: './individual-audit-report.component.html',
  styleUrls: ['./individual-audit-report.component.css']
})
export class IndividualAuditReportComponent implements OnInit {
  configArr = AppConfig.formConfig;
  staffData: any = [];
  pre_primary: any = [];
  scl_name: string = "";
  class_1_5: any = [];
  class_6_8: any = [];
  class_9_12: any = [];
  co_curricular: any = [];
  non_teaching: any = [];
  principal_answers: any = [];
  principalData: any = [];
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getPrincipalBySchoolId();
    if (localStorage.getItem('name')) {
      this.scl_name = localStorage.getItem('name');
    }
  }

  getStaffList() {
    this.commonService.getStaffList().subscribe(res => {
      if (res['data']) {
        this.staffData = res['data'];
        for(let staff of this.staffData){
          for(let principal of this.principalData){
            if(principal['staffId'] == staff._id){
              staff.principalTotalMarks = principal.totalMarks;
            }
          }
        }
        console.log("sty", this.staffData);


        this.staffData.map(item => {
          if (item.className.includes(AppConfig.nt_class[0]) || item.className.includes(AppConfig.nt_class[1]) || item.className.includes(AppConfig.nt_class[2])) {
            this.pre_primary.push(item);
          } else if (item.className.includes(AppConfig.prt_class[0]) || item.className.includes(AppConfig.prt_class[1]) || item.className.includes(AppConfig.prt_class[2]) || item.className.includes(AppConfig.prt_class[3]) || item.className.includes(AppConfig.prt_class[4])) {
            this.class_1_5.push(item);
          } else if (item.className.includes(AppConfig.tgt_class[0]) || item.className.includes(AppConfig.tgt_class[1]) || item.className.includes(AppConfig.tgt_class[2]) || item.className.includes(AppConfig.tgt_class[3]) || item.className.includes(AppConfig.tgt_class[4]) || item.className.includes(AppConfig.tgt_class[5]) || item.className.includes(AppConfig.tgt_class[6])) {
            this.class_6_8.push(item);
          } else if (item.className.includes(AppConfig.nt_class[0]) || item.className.includes(AppConfig.nt_class[1])){
            this.class_9_12.push(item);
          } else if (item.staffArea.includes(AppConfig.nonteachingArea[0]) || item.staffArea.includes(AppConfig.nonteachingArea[1]) || item.staffArea.includes(AppConfig.nonteachingArea[2]) || item.staffArea.includes(AppConfig.nonteachingArea[3]) || item.staffArea.includes(AppConfig.nonteachingArea[4]) || item.staffArea.includes(AppConfig.nonteachingArea[5]) || item.staffArea.includes(AppConfig.nonteachingArea[6])|| item.staffArea.includes(AppConfig.nonteachingArea[7])|| item.staffArea.includes(AppConfig.nonteachingArea[8])){
            this.non_teaching.push(item);
          } else {

          }
        })
        console.log("ntttt",this.non_teaching);
      }
    }, err => { })

  }

  getPrincipalBySchoolId() {
    this.commonService.getPrincipalBySchoolId().subscribe(res => {
      if (res['success']) {
        this.principalData = res['data'][0]['PrincipalStaffDetails'];
        this.getStaffList();
      }
    }, err => { })
  }
}
