import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/model/Curso';
import { CursoService } from 'src/app/services/curso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CoordenadorService } from 'src/app/services/coordenador.service';

@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.css']
})

export class CourseRegistrationComponent implements OnInit {

  private curso: Curso | null = null;
  listCoordenadores: Array<{ coordenador: string, id: string, ativo: any}> = [{ coordenador: 'Selecione o coordenador', id: '', ativo:true }];
  formData!: FormGroup;


  constructor(private cursoService: CursoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coordenadorService: CoordenadorService) {
  }

  ngOnInit(): void {
    let curso: Curso = this.route.snapshot.data['curso'];

    console.log(this.listCoordenadores)
    if (!curso) {
      curso = {
        id: '',
        nome: '',
        ppcs: '',
        coordenadores: '',
        alunos: null,
      }
      this.loadCoordenadores();
    }
    console.log(this.coordenadorService.list())
    const currentYear = new Date().getFullYear();

    // this.formData = this.formBuilder.group({
    //   nome: [curso.nome, [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-']{5,120}$/)]],
    //   // ppcs: [
    //   //   curso.ppcs[0].ano,
    //   //   [
    //   //     Validators.required,
    //   //     Validators.pattern(`^(${currentYear - 10}|${currentYear - 9}|${currentYear - 8}|${currentYear - 7}|${currentYear - 6}
    //   //       |${currentYear - 5}|${currentYear - 4}|${currentYear - 3}|${currentYear - 2}|${currentYear - 1}|${currentYear})$`)
    //   //   ]
    //   // ],
    //   coordenadores: [curso.coordenadores[0].nome, [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-']{5,120}$/)]],
    // });
  }


  submitForm(form: FormGroup) {
    if (form.valid) {

      const curso: Curso = {
        id: form.get('id')?.value,
        nome: form.get('nome')?.value,
        ppcs: form.get('ppcs')?.value,
        coordenadores: form.get('')?.value,
        alunos: null,
      }
      if (curso) {
        this.cursoService.save(curso).subscribe(
          (data) => {
            alert('Curso salvo com sucesso!');
            this.router.navigate(['/course']);
          },
          (error) => {
            console.error('Erro:', error);
          }
        );
      }
    }
  }

  loadCoordenadores(){
    this.coordenadorService.list().subscribe(
      (data) => {
        if (data !== null) {
          data.forEach((coordenador: any) => {
            this.listCoordenadores.push(
              { coordenador: coordenador.nome, id: coordenador.id, ativo: coordenador.ativo }
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

  coordenadoresChange(){

  }
}









