import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineRegistrationComponent } from './pages/discipline-registration/discipline-registration.component';
import { UserResgistrationComponent } from './pages/user-resgistration/user-resgistration.component';
import { AnnouncementRegistrationComponent } from './pages/announcement-registration/announcement-registration.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
