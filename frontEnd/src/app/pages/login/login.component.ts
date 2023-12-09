import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuario!: Usuario;
  usuarioLogado!: Usuario;
  public recarregado = localStorage.getItem('novoLogin');


  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@restinga\.ifrs\.edu\.br$')]],
      password: ['', [Validators.required, Validators.pattern(/^[\w\d \-~]{8,60}$/)]],
    });

    if(this.recarregado == null){
      location.reload();
      localStorage.setItem('novoLogin', 'false');
    }
  }

  submitForm(form: FormGroup) {
    if (this.isFormValid()) {
      this.usuarioService.loadByEmail(form.value.email)
        .subscribe(
          (response) => {
            this.usuario = response;
            console.log(this.usuario);
            localStorage.setItem('currentUser', JSON.stringify(this.usuario));
            localStorage.setItem('novoLogin', 'true');
            this.router.navigate(['/request']);
          },
          (error) => {
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
