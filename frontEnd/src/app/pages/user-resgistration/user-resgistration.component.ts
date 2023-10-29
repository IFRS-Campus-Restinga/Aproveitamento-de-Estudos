import { Component } from '@angular/core';

@Component({
  selector: 'app-user-resgistration',
  templateUrl: './user-resgistration.component.html',
  styleUrls: ['./user-resgistration.component.css']
})
export class UserResgistrationComponent {

  validarCursoSelecionado() {
    return this.formData.curso !== 'Selecione um curso';
  }

  formData: any = {
    curso: 'Selecione um curso'

  };

  public listCursos: Array<{ curso: string }> = [
    { curso: 'Selecione um curso' },
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
    console.log(this.formData);
  }
}
