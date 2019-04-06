import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {first, shareReplay} from 'rxjs/operators';

import {STAR_WARS_API_ROOT} from './constants';

export declare interface StarWarsCharacter {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

@Injectable({providedIn: 'root'})
export class DataService {
  private readonly characterList =
      this.httpClient.get<StarWarsCharacter>(`${STAR_WARS_API_ROOT}people/`)
          .pipe(first(), shareReplay(1));

  constructor(private readonly httpClient: HttpClient) {}

  getCharacterList(): Observable<any> {
    return this.characterList;
  }
}
