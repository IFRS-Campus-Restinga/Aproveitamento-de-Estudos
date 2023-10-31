import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.css']
})
export class CourseRegistrationComponent implements OnInit {
  courseForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      anoPpc: ['', [Validators.required, Validators.pattern('^(201[7-9]|20[2-9][0-9])$')]],
      coordenador: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÖØ-öø-ÿÇç\\s]{5,120}$')]],
      nomeCurso: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÖØ-öø-ÿ\\s]{10,60}$')]]
    });
  }
 
  submitForm(): void {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
    }
  }

  isFormValid(): boolean {
    console.log(this.courseForm.value.anpPpc)
    console.log(this.courseForm.value.coordenador)
    console.log(this.courseForm.value.nomeCurso)
    return this.courseForm.valid;
  }
  
}
