import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CharacterListComponent} from './character-list-component';
import {CharacterListViewComponent} from './character-list-view-component';
import {FilmViewComponent} from './film-view-component';
import {ReleaseDatePipe} from './release-date-pipe';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterListViewComponent,
    FilmViewComponent,
    ReleaseDatePipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
