import { NgModule } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DisciplineRegistrationComponent } from './pages/discipline/discipline-registration/discipline-registration.component';
import { TitleComponent } from './components/title/title.component';
import { UserResgistrationComponent } from './pages/users/user-resgistration/user-resgistration.component';
import { AnnouncementRegistrationComponent } from './pages/announcement/announcement-registration/announcement-registration.component';
import { AnnouncementStepComponent } from './components/announcement-step/announcement-step.component';
import { CourseListComponent } from './pages/course/course-list/course-list.component';
// import { MatTableModule } from '@angular/material/table';
import { CourseRegistrationComponent } from './pages/course/course-registration/course-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestsRegistrationComponent } from './pages/requests/requests-registration/requests-registration.component';
import { AnnouncementListComponent } from './pages/announcement/announcement-list/announcement-list.component';
import { ListsTitleComponent } from './components/lists-title/lists-title.component';
import { DisciplineListComponent } from './pages/discipline/discipline-list/discipline-list.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { RequestsListComponent } from './pages/requests/requests-list/requests-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DisciplineRegistrationComponent,
    TitleComponent,
    UserResgistrationComponent,
    AnnouncementRegistrationComponent,
    AnnouncementStepComponent,
    CourseListComponent,
    CourseRegistrationComponent,
    LoginComponent,
    RequestsRegistrationComponent,
    AnnouncementListComponent,
    ListsTitleComponent,
    DisciplineListComponent,
    UsersListComponent,
    RequestsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
