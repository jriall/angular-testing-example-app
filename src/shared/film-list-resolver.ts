import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

import {DataService, StarWarsFilm} from './data-service';

@Injectable({providedIn: 'root'})
export class FilmListResolver implements
    Resolve<Observable<StarWarsFilm[]>> {
  constructor(private readonly dataService: DataService) {}

  resolve(): Observable<StarWarsFilm[]> {
    return this.dataService.getFilmList().pipe(first());
  }
}
