import { Component } from '@angular/core';

@Component({
  selector: 'app-user-resgistration',
  templateUrl: './user-resgistration.component.html',
  styleUrls: ['./user-resgistration.component.css']
})
export class UserResgistrationComponent {
  formData: any = {
    curso: 'Selecione um curso'
  }; // Modelo para os dados do formulário

  public listCursos: Array<{ curso: string }> = [
    { curso:'Selecione um curso' },
    { curso: 'Licenciatura em Letras Português e Espanhol' },
    { curso: 'Tecnologia em Análise e Desenvolvimento de Sistemas' },
    { curso: 'Tecnologia em Eletrônica Industrial' },
    { curso: 'Tecnologia em Gestão Desportiva e de Lazer' },
    { curso: 'Tecnologia em Processos Gerenciais' },
    { curso: 'Técnico em Eletrônica' },
    { curso: 'Técnico em informática' },
    { curso: 'Técnico em lazer' },
    { curso: 'Técnico em agroecologia' },
    { curso: 'Técnico em guia de turismo' },
    { curso: 'Técnico em comércio' }
  ];

  submitForm(form: any) {
    // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor ou exibi-los no console.
    console.log(this.formData);
  }
}
