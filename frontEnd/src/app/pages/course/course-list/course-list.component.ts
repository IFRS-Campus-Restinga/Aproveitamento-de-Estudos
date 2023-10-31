import { Component } from '@angular/core';
import { Curso } from '../../../model/Curso';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {
  course: Curso[] = [{id: '01',nome: 'Tecnologia de Analise e Desenvolvimento de Sistemas',ppc :'2022'}];
  displayedColumns = ['nome','ppc','editar'];

  constructor(){

  }

}
