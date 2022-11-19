import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  public isLoggedIn: boolean = false;
  public userName: string = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('userInfo')) {
      this.isLoggedIn = true;
      this.userName = JSON.parse(localStorage.getItem('userInfo')).name;
    }
  }

  ngDoCheck(): void {
    if(localStorage.getItem('userInfo')) {
      this.isLoggedIn = true;
      this.userName = JSON.parse(localStorage.getItem('userInfo')).name;
    } else {
      this.isLoggedIn = false;
      this.userName = null;
    }
  }


  onLogout() {
    this.isLoggedIn = false;
    this.userName = null;
    localStorage.removeItem('userInfo');
    this.router.navigate(['home']);
  }

}
