import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errorMessage: string = null;
  public isLoading: boolean = false;

  public profileForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  })

  constructor(private userService: UserService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    if(localStorage.getItem('userInfo')) {
      this.location.back();
    }
  }

  onSubmit(){
    if(!this.profileForm.valid) {
      return
    }
    this.isLoading = true;

    const data = this.profileForm.value;
    this.userService.loginUser(data.email, data.password).subscribe({
      next: (resp) => {
        this.isLoading = false;
        this.errorMessage = null
        localStorage.setItem('userInfo', JSON.stringify(resp));
        this.location.back();
      },
      error: (resp) => {
        this.isLoading = false;
        this.errorMessage = resp.error.detail;
      }
    });


  }

}
