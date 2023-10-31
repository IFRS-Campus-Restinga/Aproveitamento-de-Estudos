import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@restinga\.ifrs\.edu\.br$')]],
      password: ['', [Validators.required, Validators.pattern('^(?!.*[!*])[\w\d -_~]{8,60}$')]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  isFormValid(): boolean {
    console.log(this.loginForm.value.email)
    console.log(this.loginForm.value.password)
	  return this.loginForm.valid;
  }

}
