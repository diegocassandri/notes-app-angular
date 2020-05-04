import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from "aws-amplify";
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSpinning = false;
  validateForm: FormGroup;

  constructor(private fb: FormBuilder,private message: NzMessageService, private router: Router) {}

  submitForm(): void {
    
    this.isSpinning = true;

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    Auth.signIn(this.validateForm.value.email,this.validateForm.value.password)
    .then(response => {
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
