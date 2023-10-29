import { Injectable } from '@angular/core';
import { Course } from '../model/Course';
import { HttpClient } from '@angular/common/http';
import { first, of, tap, delay } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly api = '../assets/courses.json';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Course[]>(this.api)
    .pipe(
      first(),
      delay(1500),
      tap(courses => console.log(courses)));
  }
}
