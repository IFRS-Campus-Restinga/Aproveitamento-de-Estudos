import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../model/course';
import { CoursesService } from 'src/app/services/courses.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

  courses$: Observable<Course[]>;
  displayedColumns = ['nome','ppc','editar'];
  
  constructor(private coursesService: CoursesService, public dialog: MatDialog){
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos!');
        return of([]);
      })
    );
    
  
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg 
    });

  }
}
