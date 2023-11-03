import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from 'src/app/services/courses.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { Curso } from 'src/app/model/Curso';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

  courses$: Observable<Curso[]>;
  displayedColumns = ['nome','ppc','actions'];

  constructor(private coursesService: CoursesService, public dialog: MatDialog, private router: Router){
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

  onAdd() {
    console.log('cadastrar');
    this.router.navigate(['course/register']);
  }
}
