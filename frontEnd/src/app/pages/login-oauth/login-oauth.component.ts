import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.css']
})
export class LoginOAuthComponent {

  private readonly api = "http://localhost:8080/api";

  constructor(private router: Router){

  }

  loginWithRedirect() {
  }


  onClick() {
    console.log('indo');
    window.location.href = this.api;
  }
}
