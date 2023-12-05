import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuario!: Usuario

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
    ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@restinga\.ifrs\.edu\.br$')]],
      password: ['', [Validators.required, Validators.pattern(/^[\w\d \-~]{8,60}$/)]],
    });
  }

  submitForm(form: FormGroup) {
    // if (this.isFormValid()) {
    if (true) {
      this.usuarioService.loadByEmail(form.value.email)
        .subscribe(
          (response) => {
            // Recebe a resposta do backend
            this.usuario = response;
            console.log(this.usuario);
            // Aqui você pode tratar os dados recebidos e redirecionar para outra página, por exemplo.
          },
          (error) => {
            // Trata erros caso a requisição falhe
            console.error('Erro:', error);
          }
        );
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
