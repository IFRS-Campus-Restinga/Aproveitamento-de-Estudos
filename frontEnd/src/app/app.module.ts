import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import {NgOptimizedImage} from "@angular/common";
import { HeaderComponent } from './components/header/header.component';
import { DisciplineRegistrationComponent } from './pages/discipline-registration/discipline-registration.component';
import { TitleComponent } from './components/title/title.component';
import { UserResgistrationComponent } from './pages/user-resgistration/user-resgistration.component';
import { FormsModule } from '@angular/forms';
import { AnnouncementRegistrationComponent } from './pages/announcement-registration/announcement-registration.component';
import { AnnouncementStepComponent } from './components/announcement-step/announcement-step.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { MatTableModule } from '@angular/material/table';
import { CourseRegistrationComponent } from './pages/course-registration/course-registration.component';

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
    CourseRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
