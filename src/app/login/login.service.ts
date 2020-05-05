import { Injectable } from '@angular/core';
import { Auth } from "aws-amplify";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  jwthelper: JwtHelperService;
  emailConfirmation: string;

  constructor() { 
    this.jwthelper = new JwtHelperService();
  }

  signIn(email: string, password: string) {
    return  Auth.signIn(email,password);
  }

  signOut() {
    return Auth.signOut();
  }

  signUp(email: string, password: string) {
    return Auth.signUp(email,password);
  }

  confirmSignUp(email: string, confirmation: string) {
    return Auth.confirmSignUp(email,confirmation);
  }
  isInvalidToken(): boolean {
      return this.jwthelper.isTokenExpired(localStorage.getItem('notes_app_token'));
  }

}
