import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {DataService} from './data-service';

@Injectable({providedIn: 'root'})
export class FilmGuard implements CanActivate {
  constructor(
      private readonly router: Router,
      private readonly dataService: DataService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.dataService.getFilmList().pipe(map(filmList => {
      const routeId = +route.paramMap.get('id');
      const selectedFilm = filmList.find(film => film.episode_id === routeId);

      if (selectedFilm) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }));
  }
}
