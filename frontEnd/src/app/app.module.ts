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
import { CourseRegistrationComponent } from './pages/course/course-registration/course-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestsRegistrationComponent } from './pages/requests/requests-registration/requests-registration.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';


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
    ErrorDialogComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
