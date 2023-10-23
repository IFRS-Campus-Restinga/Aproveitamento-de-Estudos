import { Component } from '@angular/core';

@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.css']
})
export class CourseRegistrationComponent {
  formData: any = {};

  submitForm(form: any) {
    console.log(this.formData);
  }
}
