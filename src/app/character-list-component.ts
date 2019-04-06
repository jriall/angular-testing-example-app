import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {StarWarsCharacter} from './data-service';

@Component({
  selector: 'character-list',
  templateUrl: './character-list-component.html',
})
export class CharacterListComponent implements OnInit {
  @Input() characterList: StarWarsCharacter[] = [];

  ngOnInit() {
    console.log(this.characterList);
  }
}
