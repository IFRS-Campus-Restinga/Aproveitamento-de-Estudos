import { Edital } from './model/Edital';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineRegistrationComponent } from './pages/discipline/discipline-registration/discipline-registration.component';
import { studentResgistrationComponent } from './pages/student/student-resgistration/student-resgistration.component';
import { AnnouncementRegistrationComponent } from './pages/announcement/announcement-registration/announcement-registration.component';
import { CourseListComponent } from './pages/course/course-list/course-list.component';
import { CourseRegistrationComponent } from './pages/course/course-registration/course-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestsRegistrationComponent } from './pages/requests/requests-registration/requests-registration.component';
import { AnnouncementListComponent } from './pages/announcement/announcement-list/announcement-list.component';
import { DisciplineListComponent } from './pages/discipline/discipline-list/discipline-list.component';
import { studentListComponent } from './pages/student/student-list/student-list.component';
import { RequestsListComponent } from './pages/requests/requests-list/requests-list.component';
import { EditalResolver } from './pages/announcement/guards/announcement-registration.resolver';
import { StudentResolver } from './pages/student/guards/student-registration.resolver';

const routes: Routes = [
  {
    path:'discipline',
    component:DisciplineListComponent
  },
  {
    path:'discipline/register',
    component:DisciplineRegistrationComponent
  },
  {
    path:'student',
    component:studentListComponent
  },
  {
    path:'student/register',
    component:studentResgistrationComponent
  },
  {
    path: 'student/edit/:id',
    component: studentResgistrationComponent,
    resolve:{aluno : StudentResolver}
  },
  {
    path: 'announcement',
    component:AnnouncementListComponent
  },
  {
    path:'announcement/register',
    component:AnnouncementRegistrationComponent
  },
  {
    path:'course',
    component:CourseListComponent
  },
  {
    path:'course/register',
    component:CourseRegistrationComponent
  },
  {
    path:'request',
    component:RequestsListComponent
  },
  {
    path:'register/request',
    component:RequestsRegistrationComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'announcement/edit/:id',
    component: AnnouncementRegistrationComponent,
    resolve:{edital : EditalResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
