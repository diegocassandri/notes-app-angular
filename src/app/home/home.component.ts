import { Component, OnInit } from '@angular/core';
import { Auth } from "aws-amplify";
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;

  username = 'DC';

  constructor(private router: Router,
    private message: NzMessageService,
    private loginService: LoginService) { }

  ngOnInit(): void {

  }

  logout() {
    this.loginService.signOut()
    .then(response => {
      localStorage.removeItem('notes_app_token');
      this.router.navigate(['/login']);
    })
    .catch(error => {
      this.message.create('error', error.message);
    });

  }

}
