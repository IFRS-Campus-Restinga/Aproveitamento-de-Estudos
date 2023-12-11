import { Component, OnInit } from '@angular/core';
import { PpcService } from 'src/app/services/ppc.service';
import { CursoService } from 'src/app/services/curso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PpcCreate } from 'src/app/model/PpcCreate';
@Component({
  selector: 'app-ppc-registration',
  templateUrl: './ppc-registration.component.html',
  styleUrls: ['./ppc-registration.component.css']
})
export class PpcRegistrationComponent implements OnInit {

  private ppc: PpcCreate | null = null;
  public cursos: any[] | null = null;
  public listCursos: Array<{ curso: string, id: number }> = [];
  formData!: FormGroup;
  anoAtual!: number;
  isEditMode: boolean = false;
  cursoSelecionado: string = ''; // Ou do tipo apropriado para o curso

  constructor(private ppcService: PpcService,
              private cursoService: CursoService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadCursos();
    let ppc: PpcCreate = this.route.snapshot.data['PpcCreate'];

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        // Mais lógica aqui, se necessário, ao entrar no modo de edição
      }
    });

    this.anoAtual = new Date().getFullYear();
    console.log(ppc);

    if(!ppc) {
      ppc = {
        id: '',
        curso_id: 0,
        nomePPC: '',
        ano: 0,
      }
    }

    this.formData = this.formBuilder.group({
      ppc_id: [ppc.id],
      curso: [ppc.curso_id, Validators.required],
      nomePPC: [ppc.nomePPC, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        this.spaceValidator(),
        // Validators.pattern(/^[^\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/),
      ]],
      ano: [ppc.ano, [
        Validators.required,
        Validators.pattern('^[0-9]{4}$'),
        Validators.min(2010),
        Validators.max(this.anoAtual)
      ]],
    });
  }

  submitForm(form: FormGroup) {
    if (form.valid) {
      const selectedCursoId = this.formData.get('curso')?.value;
      console.log(selectedCursoId);

      const ppc: PpcCreate = {
        id: form.get('ppc_id')?.value,
        curso_id: selectedCursoId,
        nomePPC: form.get('nomePPC')?.value,
        ano: form.get('ano')?.value,
      };

      if (ppc) {
        this.ppcService.createPPC(ppc).subscribe(
          (data) => {
            alert('PPC salvo com sucesso!');
            this.router.navigate(['/ppc']);
          },
          (error) => {
            console.error('Erro:', error);
          }
        );
      }
    }
  }

  loadCursos() {
    this.cursoService.list().subscribe(
      (data) => {
        if (data !== null) {
          data.forEach((curso: any) => {
            this.listCursos.push(
              { curso: curso.nome, id: curso.id }
            );
          });

          // Define o curso selecionado se estiver em modo de edição
          if (this.isEdit() && this.listCursos.length >= 0) {
            const cursoSelecionado = this.listCursos.find(curso => curso.id === this.formData.get('curso')?.value);
            this.cursoSelecionado = cursoSelecionado ? cursoSelecionado.curso : '';
          }
        }
      },
      (error) => {
        console.log('Erro:', error);
      }
    );
  }

  spaceValidator() {
    return (control: any) => {
      if (control.value && control.value.startsWith(' ')) {
        return { 'startsSpace': true };
      }
      if (control.value && control.value.endsWith(' ')) {
        return { 'endsSpace': true };
      }
      if (control.value && /\s{2,}/.test(control.value)) {
        return { 'multipleSpaces': true };
      }
      return null;
    };
  }

  isCursoValid() {
    const cursoControl = this.formData.get('curso');
    return cursoControl?.touched && cursoControl?.invalid && cursoControl?.value !== 0;
  }

  isValid(campo: string): boolean {
    const fieldControl = this.formData.get(campo);

    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }
    return false;
  }

  isEdit(){
    return this.isEditMode;
  }

}
