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
      password: ['', [Validators.required, Validators.pattern(/^[\w\d \-~]{8,60}$/)]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }

  isValid(campo: string): boolean {
    const fieldControl = this.loginForm.get(campo);

    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }

    return false;
  }

}
