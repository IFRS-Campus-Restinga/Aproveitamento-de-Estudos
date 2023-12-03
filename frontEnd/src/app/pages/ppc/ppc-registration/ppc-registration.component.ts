import { Component, OnInit } from '@angular/core';
import { Ppc } from 'src/app/model/Ppc';
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

  constructor(private ppcService: PpcService,
              private cursoService: CursoService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadCursos();
    let ppc: Ppc = this.route.snapshot.data['ppc'];
    console.log(this.listCursos);

    if(!ppc) {
      ppc = {
        id: '',
        curso: '',
        nomePPC: '',
        ano: 0,

      }
    }

    this.formData = this.formBuilder.group({
      ppc_id: [ppc.id],
      nomePPC: [ppc.nomePPC,],
      ano: [ppc.ano],
      curso: [ppc.curso.id],
    });
  }
  //--------------------------------------------------
  submitForm(form: FormGroup) {
    if (form.valid) {
      const selectedCursoId = this.formData.get('curso')?.value;
      console.log(selectedCursoId);

      const ppc: Ppc = {
        id: form.get('ppc_id')?.value,
        nomePPC: form.get('nomeCompleto')?.value,
        ano: form.get('ano')?.value,
        curso: {
          id: selectedCursoId,
          nome: "",
        },
      };

      if (ppc) {
        this.ppcService.createPpc(ppc).subscribe(
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

  //--------------------------------------------------



  isFormValid(): boolean {
    return this.formData.valid && this.isCursoValid();
  }

  loadCursos() {
    this.cursoService.list().subscribe(
      (data) => {
        if (data !== null) {
          data.forEach((curso: any) => {
            this.listCursos.push(
              { curso: curso.nome, id: curso.id }
            )
          });
        }
      },
      (error) => {
        console.log('Erro:', error);
      }
    );
  }

  isCursoValid(): boolean {
    return this.formData.get('curso')?.value !== 'Selecione um curso';
  }

  isValid(campo: string): boolean {
    const fieldControl = this.formData.get(campo);

    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }
    return false;
  }
}
