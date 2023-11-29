import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/model/Curso';
import { CursoService } from 'src/app/services/curso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.css']
})

export class CourseRegistrationComponent implements OnInit {

  private curso: Curso | null = null;
  formData!: FormGroup;

  constructor(private cursoService: CursoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    let curso: Curso = this.route.snapshot.data['curso'];

    if (!curso) {
      curso = {
        id: '',
        nome: '',
        PPCs: '',
        coordenadores: '',
        alunos: null,
      }
    }

    const currentYear = new Date().getFullYear();

    this.formData = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-']{5,120}$/)]],
      PPCs: [
        '',
        [
          Validators.required,
          Validators.pattern(`^(${currentYear - 10}|${currentYear - 9}|${currentYear - 8}|${currentYear - 7}|${currentYear - 6}
            |${currentYear - 5}|${currentYear - 4}|${currentYear - 3}|${currentYear - 2}|${currentYear - 1}|${currentYear})$`)
        ]
      ],
      coordenadores: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-']{5,120}$/)]],
    });
  }


  submitForm(form: FormGroup) {
    if (form.valid) {

      const curso: Curso = {
        id: form.get('id')?.value,
        nome: form.get('nome')?.value,
        PPCs: form.get('PPCs')?.value,
        coordenadores: form.get('')?.value,
        alunos: null,
      }
      if (curso) {
        this.cursoService.save(curso).subscribe(
          (data) => {
            alert('Curso salvo com sucesso!');
            this.router.navigate(['/course']);
          },
          (error) => {
            console.error('Erro:', error);
          }
        );
      }
    }
  }

  isFormValid(): boolean {
    return this.formData.valid;
  }

  isValid(campo: string): boolean {
    const fieldControl = this.formData.get(campo);

    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }
    return false;
  }
}









