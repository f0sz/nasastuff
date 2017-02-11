import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HomePageComponent} from './home-page/home-page.component';
import {RouterModule} from "@angular/router";
import {APODComponent} from './apod/apod.component';
import {NasaService} from "./nasa.service";
import {FooterComponent} from './footer/footer.component';
import {DatepickerModule} from 'angular2-material-datepicker';

const ROUTES = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'apod',
    component: APODComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    APODComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    DatepickerModule
  ],
  providers: [NasaService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
