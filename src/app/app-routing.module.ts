import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CharacterListComponent} from './character-list-component';
import {CharacterListResolver} from './character-list-resolver';

const routes: Routes = [{
  path: '',
  component: CharacterListComponent,
  resolve: {
    characterList: CharacterListResolver,
  },
}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {
}
