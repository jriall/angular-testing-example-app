import {Component} from '@angular/core';
import {DataService} from './data-service';

@Component({
  selector: 'character-list-view',
  template: `
    <h1>Star Wars Character List</h1>
    <character-list [characterList]="characterList"></character-list>
  `,
})
export class CharacterListViewComponent {
  private readonly characterList = this.dataService.getCharacterList();

  constructor(private readonly dataService: DataService) {
  }
}
