import { Component, OnInit } from '@angular/core';
import { CursoCreate } from 'src/app/model/CursoCreate';
import { CursoService } from 'src/app/services/curso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CoordenadorService } from 'src/app/services/coordenador.service';
import { Coordenador } from 'src/app/model/Coordenador';

@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.css']
})

export class CourseRegistrationComponent implements OnInit {

  private curso: CursoCreate | null = null;
  listCoordenadores!: Coordenador[];
  formData!: FormGroup;
  exibeCoordenadores: boolean = false;


  constructor(private cursoService: CursoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coordenadorService: CoordenadorService) {
  }

  ngOnInit(): void {
    let curso: CursoCreate = this.route.snapshot.data['curso'];
    if (!curso) {
      curso = {
        id: '',
        nome: '',
        coordenador_id: 0,
        coordenadores: [{ nome: 'Selecione o curso', id: '0', ativo: false }]
      }
    } else {
      this.exibeCoordenadores = true;
      this.listCoordenadores = curso.coordenadores;
      console.log(this.exibeCoordenadores);
      console.log(this.listCoordenadores);
    }
    this.formData = this.formBuilder.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/),
      Validators.minLength(2),Validators.maxLength(120)]],
      coordenador_id: [curso.coordenador_id, []],
    });

  }


  submitForm(form: FormGroup) {
    if (form.valid) {
      const curso: CursoCreate = {
        id: form.get('id')?.value,
        nome: form.get('nome')?.value,
        coordenador_id: form.get('coordenador_id')?.value,
        coordenadores: this.listCoordenadores
      }
      if (curso) {
        this.cursoService.save(curso).subscribe(
          (data) => {
            alert('Curso salvo com sucesso!');
            this.router.navigate(['/course']);
          },
          (error) => {
            alert("Erro ao salvar o curso");
          }
        );
      }
    }else{
      alert("from invalido");
    }
  }

  loadCoordenadores() {
    this.coordenadorService.list().subscribe(
      (data) => {
        if (data !== null) {
          data.forEach((coordenador: Coordenador) => {
            this.listCoordenadores.push(
              { nome: coordenador.nome, id: coordenador.id, ativo: coordenador.ativo }
              // coordenador: string, id: string, ativo: boolean
            )
          });
        }
      },
      (error) => {
        console.log('Erro:', error);
      }
    );
  }

  loadCoordenadoresByIdCurso(id: number) {
    this.coordenadorService.listByIdCurso(id).subscribe(
      (data) => {
        if (data !== null) {
          data.forEach((coordenador: Coordenador) => {
            this.listCoordenadores.push(
              { nome: coordenador.nome, id: coordenador.id, ativo: coordenador.ativo }
              // coordenador: string, id: string, ativo: boolean
            )
          });
        }
      },
      (error) => {
        console.log('Erro:', error);
      }
    );
  }

  isFormValid(): boolean {
    return this.formData.valid;
  }

  isValid(campo: string): boolean {
    const fieldControl = this.formData.get(campo);

    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }
    return false;
  }

  coordenadoresChange() {
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
}
