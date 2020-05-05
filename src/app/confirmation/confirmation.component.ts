import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

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

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.loginService.confirmSignUp(this.loginService.emailConfirmation,this.validateForm.value.code)
    .then(response => {
      this.message.success('Succsess confirmation! Please LogIn');
      this.isSpinning = false;
      this.router.navigate(['/login']);
    })
    .catch(error => {
      this.message.create('error', error.message);
      this.isSpinning = false;
    });

  }

  get f() { return this.validateForm.controls; }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      code:  [null, [Validators.required]],
    });
  }

}
