import { Component } from '@angular/core';
import { AnnouncementStepComponent } from 'src/app/components/announcement-step/announcement-step.component';

@Component({
  selector: 'app-announcement-registration',
  templateUrl: './announcement-registration.component.html',
  styleUrls: ['./announcement-registration.component.css']
})
export class AnnouncementRegistrationComponent {
  formData: any = {
  };

  steps: AnnouncementStepComponent[] = [];

  addStep() {
    this.steps.push(new AnnouncementStepComponent());
}

  submitForm(form: any) {
    // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor ou exibi-los no console.
    console.log(this.formData);
  }
}
