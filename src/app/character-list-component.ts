import {Component} from '@angular/core';
import {DataService} from './data-service';

@Component({
  selector: 'character-list',
  template: `
    <h1>Character List Component</h1>
    <ng-container *ngFor="let character of characterList | async">
      <p>{{ character.name }}</p>
    </ng-container>
  `,
})
export class CharacterListComponent {
  private readonly characterList = this.dataService.getCharacterList();

  constructor(private readonly dataService: DataService) {
  }
}
