import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {RouterModule} from "@angular/router";
import {APODComponent} from './apod/apod.component';
import {NasaService} from "./providers/nasa.service";
import {EPICComponent} from './epic/epic.component';
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import 'hammerjs';

const ROUTES = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'apod',
    component: APODComponent
  },
  {
    path: 'epic',
    component: EPICComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    APODComponent,
    EPICComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    MaterialModule.forRoot(),
    FlexLayoutModule,
  ],
  providers: [NasaService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
