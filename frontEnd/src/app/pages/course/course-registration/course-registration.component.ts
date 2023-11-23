import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  
  constructor(private formBuilder: FormBuilder, private service: CoursesService, private router: Router) {

    this.form = this.formBuilder.group({
      nome: [null],
      PPCs: [null],
      coordenadores: [null],
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

//  private onError(){
//    this.snackBar.open('erro ao salvar curso.', '', { duration: 5000});
//  }
}
