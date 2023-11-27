import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';
//import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Curso } from '../../../model/Curso';

@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.css']
})
export class CourseRegistrationComponent {
  formData: any = {};
  form: FormGroup;

  // construtor utilizando o material snackbar, para customização do alert de sucesso
  //constructor(private formBuilder: FormBuilder, private service: CoursesService, private snackBar: MatSnackBar, private router: Router) {

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
    private router: Router
    ) {
    const currentYear = new Date().getFullYear();

    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-']{5,120}$/)]],
      PPCs: [
        '',
        [
          Validators.required,
          Validators.pattern(`^(${currentYear - 10}|${currentYear - 9}|${currentYear - 8}|${currentYear - 7}|${currentYear - 6}
            |${currentYear - 5}|${currentYear - 4}|${currentYear - 3}|${currentYear - 2}|${currentYear - 1}|${currentYear})$`)
        ]
      ],
      coordenadores: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-']{5,120}$/)]],
    });
  }

  onSubmit(form: any) {
    console.log(this.form.value);

    const curso: Curso = {
      nome: form.get('nome')?.value,
      PPCs: form.get('PPCs')?.value,
      coordenadores: form.get('')?.value,
      alunos: null,
    }

    this.service.save(curso).subscribe(
      (data) => {
        alert('Curso salvo com sucesso!');
      },
      (error) => {
        console.error('Erro:', error);
      });

    this.router.navigate(['course'])


  }

  isFormValid(): boolean {
    return this.form.valid;
  }

  isValid(campo: string): boolean {
    const fieldControl = this.form.get(campo);

    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }

    return false;
  }

//  private onError(){
//    this.snackBar.open('erro ao salvar curso.', '', { duration: 5000});
//  }
}
