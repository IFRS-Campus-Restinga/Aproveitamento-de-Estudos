import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData: any = {
  };

  submitForm(form: any) {
    console.log(this.formData);
  }
}
