import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  profileForm: FormGroup = new FormGroup({})
  public errorMessage: string = null;
  public isLoading: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

    this.profileForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password1: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'password1')
    });

   }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.profileForm.valid) {
      return
    }
    this.isLoading = true;

    const userData = this.profileForm.value;
    this.userService.registerUser(userData.name, userData.email, userData.password).subscribe(
      {
        next: (resp) => {
          this.isLoading = false;
          localStorage.setItem('userInfo', JSON.stringify(resp));
          this.router.navigate(['/home']);
        },
        error: (resp) => {
          this.isLoading = false;
          this.errorMessage = resp.error.detail;
        }
      }
    )
  }

}
