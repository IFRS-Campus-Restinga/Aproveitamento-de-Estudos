import { Component } from '@angular/core';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {
  course: Course[] = [{id: '01',nome: 'Tecnologia de Analise e Desenvolvimento de Sistemas',ppc :'2022'}];
  displayedColumns = ['nome','ppc','editar'];
  
  constructor(){

  }

}
