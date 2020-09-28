import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-other-assessment',
  templateUrl: './teacher-other-assessment.component.html',
  styleUrls: ['./teacher-other-assessment.component.css']
})
export class TeacherOtherAssessmentComponent implements OnInit {


  documentFormDisplay : boolean = true;
isLoggedIn : boolean = false;

constructor(
  private router: Router
) {
  this.router.events.subscribe(event=>{
    let isLogin = localStorage.getItem('token');
    if(isLogin){
      this.isLoggedIn = true;
    }
  })

  
 }

  ngOnInit() {
  }

  doLogOut(){
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  
  submitDocumentEvaluation(event){
    this.documentFormDisplay = false;
  }

}
