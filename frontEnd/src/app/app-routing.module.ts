import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineRegistrationComponent } from './pages/discipline-registration/discipline-registration.component';
import { UserResgistrationComponent } from './pages/user-resgistration/user-resgistration.component';
import { AnnouncementRegistrationComponent } from './pages/announcement/announcement-registration/announcement-registration.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseRegistrationComponent } from './pages/course-registration/course-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestsRegistrationComponent } from './pages/requests-registration/requests-registration.component';
import { AnnouncementListComponent } from './pages/announcement/announcement-list/announcement-list.component';

const routes: Routes = [
  {
    path:'register/discipline',
    component:DisciplineRegistrationComponent
  },
  {
    path:'register/user',
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
    path:'register/course',
    component:CourseRegistrationComponent
  },
  {
    path:'list/courses',
    component:CourseListComponent
  },
  {
    path:'login',
    component:LoginComponent

  },
  {
    path:'register/request',
    component:RequestsRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
