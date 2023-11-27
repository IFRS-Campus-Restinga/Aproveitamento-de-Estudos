
import { Component, OnInit } from '@angular/core';
import { Servidor } from 'src/app/model/Servidor';
import { ServidorService } from 'src/app/services/servidor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserType } from 'src/app/enum/user-type';

@Component({
  selector: 'app-servant-registration',
  templateUrl: './servant-registration.component.html',
  styleUrls: ['./servant-registration.component.css']
})

export class ServantRegistrationComponent implements OnInit {
  private servidor: Servidor | null = null;
  userTypes = Object.values(UserType).filter(type => type !== UserType.ALUNO);
  formData: FormGroup;

  constructor(private servidorService: ServidorService, private formBuilder: FormBuilder) {
    this.formData = this.formBuilder.group({
      nomeCompleto: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-']{5,120}$/)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@restinga\.ifrs\.edu\.br$')]],
      siape: ['', [Validators.required, Validators.pattern('[0-9]{6,10}')]],
      tipo: ['', [Validators.required]],
      admin: false
    });
  }

  ngOnInit(): void {
      }

  submitForm(form: FormGroup) {
    if (form.valid) {
      const servidor: Servidor = {
        nome: form.get('nomeCompleto')?.value,
        email: form.get('email')?.value,
        siape: form.get('siape')?.value,
        admin: form.get('admin')?.value,
        tipo: form.get('tipo')?.value,
      };

      if (servidor) {
        this.servidorService.createServidor(servidor).subscribe(
          (data) => {
            alert('Servidor salvo com sucesso!');
          },
          (error) => {
            console.error('Erro:', error);
          }
        );
      }
    }
  }

  isTipoValid(): boolean {
    return this.formData.get('tipo')?.value !== '';
  }

  isValid(campo: string): boolean {
    const fieldControl = this.formData.get(campo);

    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }

    return false;
  }

}
