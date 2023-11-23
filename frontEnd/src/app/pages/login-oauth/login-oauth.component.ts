import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.css']
})
export class LoginOAuthComponent {

  private readonly api = "http://localhost:8080/api";

  constructor(private router: Router, public authService: AuthService){

  }

  loginWithRedirect() {
    this.authService.loginWithRedirect();
  }


  onClick() {
    console.log('indo');
    window.location.href = this.api;
  }
}
