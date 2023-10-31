import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-resgistration.component.html',
  styleUrls: ['./user-resgistration.component.css']
})
export class UserResgistrationComponent implements OnInit {
  userForm!: FormGroup;
  cursos: string[] = [
    'Selecione um curso',
    'Licenciatura em Letras Português e Espanhol',
    'Tecnologia em Análise e Desenvolvimento de Sistemas',
    'Tecnologia em Eletrônica Industrial',
    'Tecnologia em Gestão Desportiva e de Lazer',
    'Tecnologia em Processos Gerenciais',
    'Técnico em Eletrônica',
    'Técnico em informática',
    'Técnico em lazer',
    'Técnico em agroecologia',
    'Técnico em guia de turismo',
    'Técnico em comércio'
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      nomeCompleto: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÖØ-öø-ÿÇç\s]{5,120}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@restinga\.ifrs\.edu\.br$')]],
      curso: ['Selecione um curso', Validators.required],
      matricula: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      ingresso: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/(201[6-9]|202[0-6])$')]]
    });
  }

  submitForm(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }

  isFormValid(): boolean {
    console.log(this.userForm.value.email.valid)
    console.log(this.userForm.value.email)
    console.log(this.isCursoValid())
    return this.userForm.valid && this.isCursoValid();
  }

  isCursoValid(): boolean {
    return this.userForm.get('curso')?.value !== 'Selecione um curso';
  }
}