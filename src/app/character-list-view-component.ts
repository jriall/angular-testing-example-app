import {Component} from '@angular/core';
import {DataService} from './data-service';

@Component({
  selector: 'character-list-view',
  template: `
    <h1>Star Wars Character List</h1>
    <ng-container *ngIf="characterList | async as characterList">
      <character-list [characterList]="characterList"></character-list>
    </ng-container>
  `,
  styles: [`
    h1 {
      font: 400 40px / 50px 'Google Sans';
      margin-bottom: 52px;
      text-align: center;
    }
  `],
})
export class CharacterListViewComponent {
  private readonly characterList = this.dataService.getCharacterList();

  constructor(private readonly dataService: DataService) {
  }
}
