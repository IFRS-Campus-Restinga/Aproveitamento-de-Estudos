import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-discipline-registration',
  templateUrl: './discipline-registration.component.html',
  styleUrls: ['./discipline-registration.component.css']
})
export class DisciplineRegistrationComponent implements OnInit {
  disciplineForm!: FormGroup;
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
    this.disciplineForm = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.pattern('^[A-Z]{3}-[A-Z]{3}[0-9]{3}$')]],
      disciplina: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9À-ÖØ-\\s]{10,120}$')]],
      curso: ['Selecione um curso', Validators.required],
      cargaHoraria: ['', [Validators.required, Validators.min(10)]]
    });
  }

  submitForm(): void {
    if (this.disciplineForm.valid) {
      console.log(this.disciplineForm.value);
    }
  }

  isFormValid(): boolean {
    console.log(this.disciplineForm.value.cargaHoraria)
    console.log(this.disciplineForm.value.codigo)
    console.log(this.disciplineForm.value.disciplina)
    console.log(this.isCursoValid())
    return this.disciplineForm.valid && this.isCursoValid();
  }

  isCursoValid(): boolean {
    return this.disciplineForm.get('curso')?.value !== 'Selecione um curso';
  }

  convertCodigoToUpperCase() {
    this.disciplineForm.get('codigo')?.setValue(this.disciplineForm.value.codigo.toUpperCase());
  }

  convertDisciplinaToUpperCase() {
    this.disciplineForm.get('disciplina')?.setValue(this.disciplineForm.value.disciplina.toUpperCase());
  }

  isValid(campo: string): boolean {
    const fieldControl = this.disciplineForm.get(campo);
    
    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }
    
    return false;
  }

}
