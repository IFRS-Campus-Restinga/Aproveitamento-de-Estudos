import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@restinga\.ifrs\.edu\.br$')]],
      password: ['', [Validators.required, Validators.pattern(/^[\w\d \-~]{8,60}$/)]],
    });
  }

  submitForm(form: FormGroup){
    // if (this.form.valid) {
      // this.usuarioService.loadByEmail(this.loginForm.email.value)
      console.log(this.loginForm.value);
  
      // [routerLink]="['student/register']
    // }
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
