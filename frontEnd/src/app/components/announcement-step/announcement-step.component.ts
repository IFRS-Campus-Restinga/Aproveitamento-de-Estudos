import { Component } from '@angular/core';

@Component({
  selector: 'app-announcement-step',
  templateUrl: './announcement-step.component.html',
  styleUrls: ['./announcement-step.component.css']
})
export class AnnouncementStepComponent {
  formData: any = {}

  submitForm(form: any) {
    console.log(this.formData);
  }
}
