import { AppConfig } from './../config/app.config';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-consolidate-school-report',
  templateUrl: './consolidate-school-report.component.html',
  styleUrls: ['./consolidate-school-report.component.css']
})
export class ConsolidateSchoolReportComponent implements OnInit {
  title = "school-report";
  Chart: any = [];
  ratingArray = [6, 8, 1, 5, 12];
  staffData: any = [];
  principalData: any = [];
  // zero_six = [];
  // six_seven = [];
  // seven_nine = [];
  // nine_ten = [];
  rangeSelfTeachers = [0, 0, 0, 0];
  rangePrincipal = [0, 0, 0, 0];
  rangePeerTeachers = [0, 0, 0, 0];
  selfChartDisplay: boolean = true;
  peerChartDisplay: boolean = true;
  docChartDisplay: boolean = true;
  princiChartDisplay: boolean = true;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getStaffList();
    this.getPrincipalBySchoolId();

    
  }

  

  getPrincipalBySchoolId() {
    this.commonService.getPrincipalBySchoolId().subscribe(res => {
      if (res['data']) {
        this.principalData = res['data'][0]['PrincipalStaffDetails'];
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;
        this.principalData.forEach(item => {
          let isExist = this.staffData.find(it => it._id == item.staffId);
          let ToTMarks = isExist.isTeaching ? 80 : 108;
          let prRating = (item.totalMarks / ToTMarks) * 10;
          if (prRating < 6.0 && prRating > 0) {
            count1 = count1 + 1;
            this.rangePrincipal[0] = count1;
          } else if (prRating < 7.5 && prRating > 6.0) {
            count2 = count2 + 1;
            this.rangePrincipal[1] = count2;
          }
          else if (prRating < 9.0 && prRating > 7.5) {
            count3 = count3 + 1;
            this.rangePrincipal[2] = count3;
          } else {
            count4 = count4 + 1;
            this.rangePrincipal[3] = count4;
          }
        });
        this.showPrinciGraph();
        console.log("princi", res['data']);
      }
    }, err => { })
  }

  showPrinciGraph() {

    this.Chart = new Chart("PrincipalEvaluationChart", {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Principal Assessment Scoring'
        },
        legend: {
          display: false,
          position: 'right',
        }, animation: {
          animateScale: true,
          animateRotate: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 10
            },
            stacked: true
          }],
          xAxes: [{
            gridLines: {
              offsetGridLines: true
            },
            ticks: {
              maxTicksLimit: 5
            }
          }]
        }
      },
      data: {
        labels: ['0.0 - 6.0', '6.1 - 7.4', '7.5 - 9.0', '9.1 - 10.0'],
        datasets: [{
          label: 'No. of Teachers',
          data: this.rangePrincipal,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          hoverBorderWidth: 3,
          hoverBorderColor: ['rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'],
          hoverBackgroundColor: ['rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'],
          barThickness: 20,
          barPercentage: 0.5
        }]
      }
    })
  }
  getStaffList() {
    this.commonService.getStaffList().subscribe(res => {
      if (res['data']) {
        this.staffData = res['data'];
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;
        this.staffData.forEach(item => {
          if (item.isnonTeachSelfSubmitted || item.isteachSelfSubmitted) {
            let staffMarks = item.totalMarks.nonTeacherSelfMarks ? item.totalMarks.nonTeacherSelfMarks : item.totalMarks.teacherSelfMarks;
            let ToTMarks = item.totalMarks.teacherSelfMarks ? 80 : 104;
            let staffRating = (staffMarks / ToTMarks) * 10;
            if (staffRating < 6.0 && staffRating > 0) {
              count1 = count1 + 1;
              this.rangeSelfTeachers[0] = count1;
            } else if (staffRating < 7.5 && staffRating > 6.0) {
              count2 = count2 + 1;
              this.rangeSelfTeachers[1] = count2;
            }
            else if (staffRating < 9.0 && staffRating > 7.5) {
              count3 = count3 + 1;
              this.rangeSelfTeachers[2] = count3;
            } else {
              count4 = count4 + 1;
              this.rangeSelfTeachers[3] = count4;
            }
            this.showSelfGraph();
          }
        })
        let count5 = 0;
        let count6 = 0;
        let count7 = 0;
        let count8 = 0;
        this.staffData.forEach(item => {
          if (item.isnonTeachPeerSubmitted || item.isteachPeerSubmitted) {
            let staffMarks = item.totalMarks.nonTeacherPeerMarks ? item.totalMarks.nonTeacherPeerMarks : item.totalMarks.teacherPeerMarks;
            let ToTMarks = item.totalMarks.teacherPeerMarks ? 40 : 48;
            let staffRating = (staffMarks / ToTMarks) * 10;
            if (staffRating < 6.0 && staffRating > 0) {
              count1 = count1 + 1;
              this.rangePeerTeachers[0] = count5;
            } else if (staffRating < 7.5 && staffRating > 6.0) {
              count6 = count6 + 1;
              this.rangePeerTeachers[1] = count6;
            }
            else if (staffRating < 9.0 && staffRating > 7.5) {
              count7 = count7 + 1;
              this.rangePeerTeachers[2] = count7;
            } else {
              count8 = count8 + 1;
              this.rangePeerTeachers[3] = count8;
            }
          }
        })
        this.showPeerGraph();
      }
    }, err => { })
  }

  showSelfGraph() {
    
    this.Chart = new Chart("selfEvaluationChart", {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Self Assessment Scoring'
        },
        legend: {
          display: false,
          position: 'bottom',
        }, animation: {
          animateScale: true,
          animateRotate: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 10
            },
            stacked: true
          }],
          xAxes: [{
            gridLines: {
              offsetGridLines: true
            }
            ,
            ticks: {
              maxTicksLimit: 5
            }
          }]
        }
      },
      data: {
        labels: ['0.0 - 6.0', '6.1 - 7.4', '7.5 - 9.0', '9.1 - 10.0'],
        datasets: [{
          label: 'No. of Teachers',
          data: this.rangeSelfTeachers,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54  , 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          hoverBorderWidth: 3,
          hoverBorderColor: ['rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'],
          hoverBackgroundColor: ['rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'],
          barThickness: 20,
          barPercentage: 0.5
        }]
      }
    })
  }

  showPeerGraph() {
    this.Chart = new Chart("PeerEvaluationChart", {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Peer Assessment Scoring'
        },
        legend: {
          display: false,
          position: 'right',
        }, animation: {
          animateScale: true,
          animateRotate: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 10
            },
            stacked: true
          }],
          xAxes: [{
            gridLines: {
              offsetGridLines: true
            },
            ticks: {
              maxTicksLimit: 5
            }
          }]
        }
      },
      data: {
        labels: ['0.0 - 6.0', '6.1 - 7.4', '7.5 - 9.0', '9.1 - 10.0'],
        datasets: [{
          label: 'No. of Teachers',
          data: this.rangePeerTeachers,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          hoverBorderWidth: 3,
          hoverBorderColor: ['rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'],
          hoverBackgroundColor: ['rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'],
          barThickness: 20,
          barPercentage: 0.5
        }]
      }
    })
  }

  onChartChange(event) {
    if (event == "Self Assessment") {
      this.selfChartDisplay = false;
      this.peerChartDisplay = true;
      this.docChartDisplay = true;
      this.princiChartDisplay = true;
    } else if (event == "Peer Assessment") {
      this.selfChartDisplay = true;
      this.peerChartDisplay = false;
      this.docChartDisplay = true;
      this.princiChartDisplay = true;
    }else if (event == "Document Assessment") {
      this.selfChartDisplay = true;
      this.peerChartDisplay = true;
      this.docChartDisplay = false;
      this.princiChartDisplay = true;
    } else {
      this.selfChartDisplay = true;
      this.peerChartDisplay = true;
      this.docChartDisplay = true;
      this.princiChartDisplay = false;
    }
  }

}
