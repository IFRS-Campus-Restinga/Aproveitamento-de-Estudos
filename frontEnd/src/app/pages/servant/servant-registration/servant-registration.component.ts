
import { Component, OnInit } from '@angular/core';
import { Servidor } from 'src/app/model/Servidor';
import { ServidorService } from 'src/app/services/servidor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserType } from 'src/app/enum/user-type';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-servant-registration',
  templateUrl: './servant-registration.component.html',
  styleUrls: ['./servant-registration.component.css']
})

export class ServantRegistrationComponent implements OnInit {

  private servidor: Servidor | null = null;
  userTypes = Object.values(UserType).filter(type => type !== UserType.ALUNO);
  formData!: FormGroup;

  constructor(private servidorService: ServidorService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    let servidor: Servidor = this.route.snapshot.data['servidor'];
    console.log(servidor)
    if(!servidor){
      servidor = {
        id: '',
        nome: '',
        email: '',
        admin: false,
        tipo: '',
        siape: ''
      }
    }

    this.formData = this.formBuilder.group({
      servidor_id: [servidor.id],
      nomeCompleto: [servidor.nome, [Validators.required, 
      Validators.pattern(/^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*(?:[.,]\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*)*$/),
      Validators.minLength(6), Validators.maxLength(120)]],
      email: [servidor.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@restinga\.ifrs\.edu\.br$'), Validators.maxLength(50)]],
      siape: [servidor.siape, [Validators.required, Validators.pattern('[0-9]{10}'), Validators.minLength(10), Validators.maxLength(10)]],
      tipo: [servidor.tipo],
      admin: false
    });
  }

  submitForm(form: FormGroup) {
    if (form.valid) {
      const servidor: Servidor = {
        id: form.get('servidor_id')?.value,
        nome: form.get('nomeCompleto')?.value,
        email: form.get('email')?.value,
        siape: form.get('siape')?.value,
        admin: form.get('admin')?.value,
        tipo: form.get('tipo')?.value,
      };

      if (servidor) {
        this.servidorService.save(servidor).subscribe(
          (data) => {
            alert('Servidor salvo com sucesso!');
            this.router.navigate(['/servant']);
          },
          (error) => {
            console.error('Erro:', error);
          }
        );
      }
    }
  }

  isFormValid(): boolean {
    return this.formData.valid && this.isCargoValid();
  }

  isCargoValid(): boolean {
    return this.formData.get('cargo')?.value !== 'Selecione um cargo';
  }

  isValid(campo: string): boolean {
    const fieldControl = this.formData.get(campo);

    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }
    return false;
  }

  isTipoValid(): boolean {
    return this.formData.get('tipo')?.value !== '';
  }

  check(variableName: string, condition: string): boolean {
    const variable = this.formData.get(variableName);

    if (!variable) {
      return false;
    }

    switch (condition) {
      case 'minLength':
        return variable.hasError('minlength');
      case 'maxLength':
        return variable.hasError('maxlength');
      case 'status':
        return variable.invalid;
      default:
        return false;
    }
  }

  isTipoSolicitacaoSelected(): boolean {
    return this.formData.get('tipo')?.touched || this.formData.get('tipo')?.value !== '';
  }
}
