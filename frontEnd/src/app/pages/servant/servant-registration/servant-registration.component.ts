
import { Component, OnInit } from '@angular/core';
import { Servidor } from 'src/app/model/Servidor';
import { ServidorService } from 'src/app/services/servidor.service';
// import { CursoService } from 'src/app/services/curso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserType } from 'src/app/enum/user-type';

@Component({
  selector: 'app-servant-registration',
  templateUrl: './servant-registration.component.html',
  styleUrls: ['./servant-registration.component.css']
})

export class ServantRegistrationComponent implements OnInit {
  private servidor: Servidor | null = null;
  userTypes = Object.values(UserType).filter(type => type !== UserType.ALUNO);
  // public cursos: any[] | null = null;
  // public listCursos: Array<{ curso: string, id: number }> = [];
  formData: FormGroup;

  constructor(private servidorService: ServidorService, private formBuilder: FormBuilder) {
    // constructor(private servidorService: ServidorService, private cursoService: CursoService, private formBuilder: FormBuilder) {
    this.formData = this.formBuilder.group({
      nomeCompleto: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-']{5,120}$/)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@restinga\.ifrs\.edu\.br$')]],
      // curso: ['', Validators.required],
      siape: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      tipo: [''],
      admin: false
    });
  }

  ngOnInit(): void {
    // this.loadCursos();
  }

  submitForm(form: FormGroup) {
    if (form.valid) {
      // const selectedCursoId = this.formData.get('curso')?.value;

      const servidor: Servidor = {
        nome: form.get('nomeCompleto')?.value,
        email: form.get('email')?.value,
        siape: form.get('siape')?.value,
        admin: form.get('admin')?.value,
        tipo: form.get('cargo')?.value,
      };

      if (servidor) {
        this.servidorService.createServidor(servidor).subscribe(
          (data) => {
            alert('Servidor salvo com sucesso!');
          },
          (error) => {
            console.error('Erro:', error);
          }
        );
      }
    }
  }

  // isFormValid(): boolean {
  //   return this.formData.valid && this.isCursoValid();
  // }

  // loadCursos(){
  //   this.cursoService.getCursos().subscribe(
  //     (data) => {
  //       if (data !== null) {
  //         data.forEach((curso: any) => {
  //           this.listCursos.push(
  //             { curso: curso.nome, id: curso.id }
  //           )
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.log('Erro:', error);
  //     }
  //   );
  // }

  // isCursoValid(): boolean {
  //   return this.formData.get('curso')?.value !== 'Selecione um curso';
  // }

  isValid(campo: string): boolean {
    const fieldControl = this.formData.get(campo);

    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }

    return false;
  }

}
