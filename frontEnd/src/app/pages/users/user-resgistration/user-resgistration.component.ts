
import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/model/Aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { CursoService } from 'src/app/services/curso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-resgistration',
  templateUrl: './user-resgistration.component.html',
  styleUrls: ['./user-resgistration.component.css']
})

export class UserResgistrationComponent implements OnInit {
  private aluno: Aluno | null = null;
  public cursos: any[] | null = null;
  public listCursos: Array<{ curso: string, id: number }> = [];
  formData: FormGroup;
 
  constructor(private alunoService: AlunoService, private cursoService: CursoService, private formBuilder: FormBuilder) {
    this.formData = this.formBuilder.group({
      nomeCompleto: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-']{5,120}$/)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@restinga\.ifrs\.edu\.br$')]],
      curso: ['', Validators.required],
      matricula: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      ingresso: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(201[6-9]|202[0-6])$/)]],
      tipo: ['ALUNO'],
      admin: false
    });
  }


  ngOnInit(): void {
    this.loadCursos();
  }

  submitForm(form: FormGroup) {
    if (form.valid) {
      const selectedCursoId = form.get('curso')?.value;
      
      // Check if the selected curso exists in the listCursos
      const selectedCurso = this.listCursos.find(c => c.id === selectedCursoId);
  
      if (selectedCurso) {
        // The selected curso exists, so you can save the Aluno entity
        const aluno: Aluno = {
          nome: form.get('nomeCompleto')?.value,
          email: form.get('email')?.value,
          matricula: form.get('matricula')?.value,
          dataIngresso: form.get('ingresso')?.value,
          curso: selectedCurso.id, // Use the selected curso ID
          admin: form.get('admin')?.value,
          tipo: form.get('tipo')?.value,
        };
  
        if (aluno) {
          this.alunoService.createAluno(aluno).subscribe(
            (data) => {
              alert('Aluno salvo com sucesso!');
            },
            (error) => {
              console.error('Erro:', error);
            }
          );
        }
      } else {
        // Handle the case when the selected curso does not exist
        console.error('Selected curso not found in listCursos.');
      }
    }
  }
  
  
  
  isFormValid(): boolean {
    return this.formData.valid && this.isCursoValid();
  }

  loadCursos(){
    this.cursoService.getCursos().subscribe(
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