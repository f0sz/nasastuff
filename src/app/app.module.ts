import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {RouterModule} from "@angular/router";
import {APODPageComponent} from './apod-page/apod-page.component';
import {NasaService} from "./providers/nasa.service";
import {EPICPageComponent} from './epic/epic-page.component';
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import 'hammerjs';
import {ApodInfoModalComponent} from './apod-info-modal/apod-info-modal.component';

const ROUTES = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'apod',
    component: APODPageComponent
  },
  {
    path: 'epic',
    component: EPICPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    APODPageComponent,
    EPICPageComponent,
    ApodInfoModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [NasaService],
  bootstrap: [AppComponent],
  entryComponents: [ApodInfoModalComponent]
})
export class AppModule {
}
