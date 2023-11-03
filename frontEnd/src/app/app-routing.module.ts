
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineRegistrationComponent } from './pages/discipline/discipline-registration/discipline-registration.component';
import { UserResgistrationComponent } from './pages/users/user-resgistration/user-resgistration.component';
import { AnnouncementRegistrationComponent } from './pages/announcement/announcement-registration/announcement-registration.component';
import { CourseListComponent } from './pages/course/course-list/course-list.component';
import { CourseRegistrationComponent } from './pages/course/course-registration/course-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestsRegistrationComponent } from './pages/requests/requests-registration/requests-registration.component';
import { AnnouncementListComponent } from './pages/announcement/announcement-list/announcement-list.component';
import { DisciplineListComponent } from './pages/discipline/discipline-list/discipline-list.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { RequestsListComponent } from './pages/requests/requests-list/requests-list.component';

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
    path:'user',
    component:UsersListComponent
  },
  {
    path:'user/register',
    component:UserResgistrationComponent
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
