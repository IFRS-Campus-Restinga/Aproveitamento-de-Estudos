import { Component } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from 'src/app/services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

  courses$: Observable<Course[]>;
  displayedColumns = ['nome','ppc','editar'];
  
  constructor(private coursesService: CoursesService){
    this.courses$ = this.coursesService.list();
    

  }



}
