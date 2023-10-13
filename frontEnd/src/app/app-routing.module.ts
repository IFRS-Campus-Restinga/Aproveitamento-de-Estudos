import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineRegistrationComponent } from './pages/discipline-registration/discipline-registration.component';
import { UserResgistrationComponent } from './pages/user-resgistration/user-resgistration.component';

const routes: Routes = [
  {
    path:'register/discipline',
    component:DisciplineRegistrationComponent
  },
  {
    path:'register/user',
    component:UserResgistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
