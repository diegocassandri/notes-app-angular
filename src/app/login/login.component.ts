import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSpinning = false;
  validateForm: FormGroup;
  loggedUserInitials: any;

  constructor(private fb: FormBuilder,
    private message: NzMessageService, 
    private router: Router,
    private loginService: LoginService) {}

  submitForm(): void {
    
    this.isSpinning = true;

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.loginService.signIn(this.validateForm.value.email,this.validateForm.value.password)
    .then(response => {
      localStorage.setItem('notes_app_token', response.signInUserSession.accessToken.jwtToken);

      this.isSpinning = false;
      this.router.navigate(['/home']);
    })
    .catch(error => {
      this.message.create('error', error.message);
      this.isSpinning = false;
    });
  }

  

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
