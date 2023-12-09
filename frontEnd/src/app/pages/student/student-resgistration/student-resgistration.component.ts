import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/model/Aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { CursoService } from 'src/app/services/curso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-resgistration',
  templateUrl: './student-resgistration.component.html',
  styleUrls: ['./student-resgistration.component.css']
})
export class StudentResgistrationComponent implements OnInit {

  private aluno: Aluno | null = null;
  public cursos: any[] | null = null;
  public listCursos: Array<{ curso: string, id: number }> = [];
  formData!: FormGroup;

  isEditMode: boolean = false;

  constructor(private alunoService: AlunoService,
    private cursoService: CursoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loadCursos();
    let aluno: Aluno = this.route.snapshot.data['aluno'];
    console.log(this.listCursos);

    if (!aluno) {
      aluno = {
        id: '',
        nome: '',
        email: '',
        curso: '',
        matricula: '',
        dataIngresso: '',
        admin: false,
        tipo: 'Aluno'
      }
    }

    this.formData = this.formBuilder.group({
      aluno_id: [aluno.id],
      nomeCompleto: [aluno.nome, [Validators.required, Validators.pattern(/^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*(?:[.,]\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*)*$/), 
      Validators.minLength(3),Validators.maxLength(120)]],
      email: [aluno.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@restinga\.ifrs\.edu\.br$'), Validators.maxLength(50)]],
      curso: [aluno.curso.id, Validators.required],
      matricula: [aluno.matricula, [Validators.required, Validators.pattern('[0-9]{10}'), Validators.minLength(10), Validators.maxLength(10)]],
      ingresso: [aluno.dataIngresso, [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(201[6-9]|202[0-6])$/), Validators.minLength(7), Validators.maxLength(7)]],
      tipo: ['ALUNO'],
      admin: false
    });
  }

  submitForm(form: FormGroup) {
    if (form.valid) {
      const selectedCursoId = this.formData.get('curso')?.value;
      console.log(selectedCursoId);

      const aluno: Aluno = {
        id: form.get('aluno_id')?.value,
        nome: form.get('nomeCompleto')?.value,
        email: form.get('email')?.value,
        matricula: form.get('matricula')?.value,
        dataIngresso: form.get('ingresso')?.value,
        curso: {
          id: selectedCursoId,
          nome: "",
        },
        admin: form.get('admin')?.value,
        tipo: "ALUNO",
      };

      if (aluno) {
        this.alunoService.createAluno(aluno).subscribe(
          (data) => {
            alert('Aluno salvo com sucesso!');
            this.router.navigate(['/student']);
          },
          (error) => {
            console.error('Erro:', error);
          }
        );
      }
    }
  }

  isFormValid(): boolean {
    return this.formData.valid && this.isCursoValid();
  }

  loadCursos() {
    this.cursoService.list().subscribe(
      (data) => {
        if (data !== null) {
          data.forEach((curso: any) => {
            this.listCursos.push(
              { curso: curso.nome, id: curso.id }
            )
          });
        }
      },
      (error) => {
        console.log('Erro:', error);
      }
    );
  }

  /*isCursoValid(): boolean {
    return this.formData.get('curso')?.value !== 'Selecione um curso';
  }*/

  isCursoValid(){
    const cursoControl = this.formData.get('curso');
    if (cursoControl?.value  !== '0') {
      return true;
    }
    return false;
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

  isValid(campo: string): boolean {
    const fieldControl = this.formData.get(campo);

    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }
    return false;
  }

  isTipoSolicitacaoSelected(): boolean {
    return this.formData.get('curso')?.touched || this.formData.get('curso')?.value !== '';
  }

  isEdit(){
    return this.isEditMode;
  }

  
}
