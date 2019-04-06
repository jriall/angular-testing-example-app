import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CharacterListViewComponent} from './character-list-view-component';
import {CharacterListResolver} from './character-list-resolver';

const routes: Routes = [{
  path: '',
  component: CharacterListViewComponent,
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
