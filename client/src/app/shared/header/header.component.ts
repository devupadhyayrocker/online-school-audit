import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

isLoggedIn : boolean = false;



  constructor(
    private router: Router
  ) {
    
    let isLogin = localStorage.getItem('token');
    if(isLogin){
      this.isLoggedIn = true;
    }
    
   }

  ngOnInit() {
  }

  doLogOut(){
    
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
