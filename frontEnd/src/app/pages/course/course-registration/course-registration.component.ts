import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.css']
})
export class CourseRegistrationComponent {
  formData: any = {};
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: CoursesService, private snackBar: MatSnackBar, private router: Router) {

    this.form = this.formBuilder.group({
      nome: [null],
      //anoPpc: [null],
      //coordenador: [null],
    });
  }


  onSubmit(form: any) {
    console.log(this.form.value);
    this.service.save(this.form.value)
    .subscribe(result => console.log(result), error =>this.onError );
    this.router.navigate(['course'])

    
  }

  private onError(){
    this.snackBar.open('erro ao salvar curso.', '', { duration: 5000});
  }
}
