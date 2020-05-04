import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginService } from './login.service';


@Injectable({providedIn: 'root'})
export class AppAuthGuardService implements CanActivate {

  constructor(public auth: LoginService, public router: Router, private message: NzMessageService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.auth.isInvalidToken()) {
      this.message.error('Login expirado. Realize a autenticação novamente');
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }

  }
}
