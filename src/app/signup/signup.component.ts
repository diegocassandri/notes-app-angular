import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

import { MustMatch } from '../helpers/MustMatch';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isSpinning = false;
  validateForm: FormGroup;
  loggedUserInitials: any;
  submitted = false;

  constructor(private fb: FormBuilder,
    private message: NzMessageService, 
    private router: Router,
    private loginService: LoginService) {}

  submitForm(): void {
    
    this.isSpinning = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      return;
    }

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.loginService.signUp(this.validateForm.value.email,this.validateForm.value.password)
    .then(response => {
      this.isSpinning = false;
      this.loginService.emailConfirmation = this.validateForm.value.email;
      this.router.navigate(['/confirmation']);
    })
    .catch(error => {
      this.message.create('error', error.message);
      this.isSpinning = false;
    });

  }

  get f() { return this.validateForm.controls; }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmation:  [null, [Validators.required]],
    },
    {
      validator: MustMatch('password', 'confirmation')
  });
  }

}
