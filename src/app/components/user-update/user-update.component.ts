import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ConfirmedValidator } from '../register/confirmed.validator';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  public user: any;
  public profileForm: FormGroup = new FormGroup({});
  public errorMessage: string = null;
  public isLoading: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.profileForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', []],
      password1: ['', []]
    }, {
      validator: ConfirmedValidator('password', 'password1')
    });
   }

  ngOnInit(): void {
    if(!localStorage.getItem('userInfo')) {
      this.router.navigate(['/home']);
    } else {
      this.user = JSON.parse(localStorage.getItem('userInfo'));
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email
      });
    }
  }


  onSubmit() {
    if(!this.profileForm.valid) {
      return;
    }
    this.isLoading = true;

    const value = this.profileForm.value;
    const localStorageToken = JSON.parse(localStorage.getItem('userInfo')).token;
    this.userService.updateUser(value.name, value.email, value.password, localStorageToken).subscribe(
      {
        next: (resp) => {
          this.isLoading = false;
          localStorage.setItem('userInfo', JSON.stringify(resp));
        },
        error: (resp) => {
          this.isLoading = false;
          this.errorMessage = resp.error.detail;
        }
      }
    )
  }

}
