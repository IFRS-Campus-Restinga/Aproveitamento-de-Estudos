import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import {NgOptimizedImage} from "@angular/common";
import { HeaderComponent } from './components/header/header.component';
import { DisciplineRegistrationComponent } from './pages/discipline-registration/discipline-registration.component';
import { TitleComponent } from './components/title/title.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DisciplineRegistrationComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
