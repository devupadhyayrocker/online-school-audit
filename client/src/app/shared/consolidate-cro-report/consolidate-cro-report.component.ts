import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-consolidate-cro-report',
  templateUrl: './consolidate-cro-report.component.html',
  styleUrls: ['./consolidate-cro-report.component.css']
})
export class ConsolidateCroReportComponent implements OnInit {
  title = "cro-report";
  chart: any = [];
  constructor() { }

  ngOnInit() {
   
    this.chart= new Chart("croReport",{
      type:'bar',
      options:{
        responsive: true,
        title:{
          display:true,
          text:'Skillwise analysis of teachers'
        },
        scales: {
          yAxes: [{
              ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                      return '$' + value;
                  }
              }
          }]
      }
      },
      data:{
        labels:['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','S12','S13','S14','S15'],
        datasets:[
          {
            type:'bar',
            label:'Pre Primary',
            data:[34,25,76,62,53,24,45,25,64,72,41,25,65,53,34],
            backgroundColor:'#fe767a',
            borderColor:'yellow',
            fill:false
          },
          {
            type:'bar',
            label:'Class 1 to 5',
            data:[34,25,76,62,53,24,45,25,64,72,41,25,65,53,34].reverse(),
            backgroundColor:'#ffce56',
            borderColor:'yellow',
            fill:false
          },
          {
            type:'bar',
            label:'Class 6 to 8',
            data:[16,56,34,26,2,8,3,65,14,25,37,43,25,63,37],
            backgroundColor:'#36a2eb',
            borderColor:'yellow',
            fill:false
          },{
            type:'bar',
            label:'Co-Curricular',
            data:[16,56,34,26,2,8,3,65,14,25,37,43,25,63,37].reverse(),
            backgroundColor:'#4bc0c0',
            borderColor:'yellow',
            fill:false
          }
        ]
      }
    })
    
  }

}
