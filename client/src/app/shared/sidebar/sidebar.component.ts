import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [AuthenticationService]
})
export class SidebarComponent implements OnInit {
  currentRole: string = "";
  currentUrl: string = "";
  constructor(private authService: AuthenticationService, private router:Router) {
    this.currentRole = this.authService.getCurrentRole();
    
    this.router.events.subscribe(event=>{
      if(event.constructor.name === "NavigationEnd"){
        this.currentUrl = event['url']
        console.log("tttyt",event['url']);
      }
   
    })
  }

  ngOnInit() {
    console.log("dev",this.currentRole);
  }




}
