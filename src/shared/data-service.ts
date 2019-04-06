import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {first, map, shareReplay} from 'rxjs/operators';

import {STAR_WARS_API_ROOT} from './constants';

export declare interface StarWarsCharacterListResponse {
  count: number;
  next: string|null;
  previous: string|null;
  results: StarWarsCharacter[];
}

export declare interface StarWarsFilmListResponse {
  count: number;
  next: string|null;
  previous: string|null;
  results: StarWarsFilm[];
}

export declare interface StarWarsFilm {
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}

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
      this.httpClient
          .get<StarWarsCharacterListResponse>(`${STAR_WARS_API_ROOT}people/`)
          .pipe(first(), shareReplay(1));

  private readonly filmList =
      this.httpClient
          .get<StarWarsFilmListResponse>(`${STAR_WARS_API_ROOT}films/`)
          .pipe(first(), shareReplay(1));

  constructor(private readonly httpClient: HttpClient) {}

  getCharacterList(): Observable<StarWarsCharacter[]> {
    return this.characterList.pipe(map(response => response.results));
  }

  getFilmList(): Observable<StarWarsFilm[]> {
    return this.filmList.pipe(map(response => response.results));
  }
}
