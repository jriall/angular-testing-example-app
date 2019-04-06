import {Component, Input, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {DataService, StarWarsCharacter} from './data-service';

declare interface FilmNameMapping {
  url: string;
  name: string;
}

@Component({
  selector: 'character-list',
  templateUrl: './character-list-component.html',
})
export class CharacterListComponent implements OnDestroy {
  private readonly destroy = new ReplaySubject<void>();
  private readonly filmList$ = this.dataService.getFilmList();
  filmNameList: FilmNameMapping[] = [];

  @Input() characterList: StarWarsCharacter[] = [];

  constructor(private readonly dataService: DataService) {
    this.filmList$.pipe(takeUntil(this.destroy)).subscribe(results => {
      this.filmNameList = results.map(film => {
        return {
          name: film.title,
          url: film.url,
        };
      });
    });
  }

  getFilmName(url: string): string {
    const film = this.filmNameList.find(film => film.url === url);

    if (film) {
      return film.name;
    } else {
      return '';
    }
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
