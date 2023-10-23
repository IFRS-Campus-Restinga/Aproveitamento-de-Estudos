import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineRegistrationComponent } from './pages/discipline-registration/discipline-registration.component';
import { UserResgistrationComponent } from './pages/user-resgistration/user-resgistration.component';
import { AnnouncementRegistrationComponent } from './pages/announcement-registration/announcement-registration.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseRegistrationComponent } from './pages/course-registration/course-registration.component';

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
    path:'register/announcement',
    component:AnnouncementRegistrationComponent
  }, 
  {
    path:'register/course',
    component:CourseRegistrationComponent
  },
  {
    path:'list/courses',
    component:CourseListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
