import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';

import {DataService, StarWarsCharacter} from './data-service';

@Injectable({providedIn: 'root'})
export class CharacterListResolver implements
    Resolve<Observable<StarWarsCharacter>> {
  constructor(private readonly dataService: DataService) {}

  resolve(): Observable<StarWarsCharacter> {
    return this.dataService.getCharacterList();
  }
}
