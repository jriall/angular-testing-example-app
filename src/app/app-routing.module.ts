import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CharacterListResolver} from './character-list-resolver';
import {CharacterListViewComponent} from './character-list-view-component';
import {FilmListResolver} from './film-list-resolver';
import { FilmViewComponent } from './film-view-component';

const routes: Routes = [{
  path: '',
  component: CharacterListViewComponent,
  resolve: {
    characterList: CharacterListResolver,
    filmList: FilmListResolver,
  },
},
{
  path: 'film/:id',
  component: FilmViewComponent,
  resolve: {
    filmList: FilmListResolver,
  },
}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {
}
