import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.css']
})
export class CourseRegistrationComponent {
  formData: any = {};
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nomeCurso: [null],
      anoPpc: [null],
      coordenador: [null],
    });
  }


  submitForm(form: any) {
    console.log(this.formData);
  }
}
