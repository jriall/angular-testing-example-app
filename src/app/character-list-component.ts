import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';

import {StarWarsCharacter} from './data-service';

@Component({
  selector: 'character-list',
  template: `
    <ng-container *ngFor="let character of characterList | async">
      <p>{{ character.name }}</p>
    </ng-container>
  `,
})
export class CharacterListComponent {
  @Input() characterList?: Observable<StarWarsCharacter[]>;
}
