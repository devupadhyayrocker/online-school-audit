import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-non-teaching-peer-assessment',
  templateUrl: './non-teaching-peer-assessment.component.html',
  styleUrls: ['./non-teaching-peer-assessment.component.css']
})
export class NonTeachingPeerAssessmentComponent implements OnInit {
  PeerFormDisplay : boolean = true;
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
  
  submitPeerEvaluation(event){
    this.PeerFormDisplay = false;
  }


}
