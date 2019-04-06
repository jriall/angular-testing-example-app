import {Component, Input, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {DataService, StarWarsCharacter} from '../shared/data-service';

declare interface FilmNameMapping {
  episode_id: number;
  url: string;
  name: string;
}

const getCharacterDescription = (name: string): string => {
  switch(name) {
    case 'Darth Vader':
      return 'Total doucher';
    case 'C-3PO':
      return 'Annoying tin can';
    case 'R5-D4':
      return 'Who?';
    default:
      return 'Good guy';
  }
};

@Component({
  selector: 'character-list',
  templateUrl: './character-list-component.html',
  styleUrls: ['./character-list-component.scss'],
})
export class CharacterListComponent implements OnDestroy {
  private readonly destroy = new ReplaySubject<void>();
  private readonly filmList$ = this.dataService.getFilmList();
  readonly getCharacterDescription = getCharacterDescription;
  filmNameList: FilmNameMapping[] = [];

  @Input() characterList: StarWarsCharacter[] = [];

  constructor(private readonly dataService: DataService) {
    this.filmList$.pipe(takeUntil(this.destroy)).subscribe(results => {
      this.filmNameList = results.map(film => {
        return {
          episode_id: film.episode_id,
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

  getFilmEpisodeId(url: string): number {
    const film = this.filmNameList.find(film => film.url === url);

    if (film) {
      return film.episode_id;
    } else {
      return 1;
    }
  }

  getImageSlug(name: string): string {
    return name.replace(/\s/g, '-').toLowerCase();
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
