import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

import {DataService} from './data-service';

@Component({
  selector: 'film-view',
  templateUrl: './film-view-component.html',
  styleUrls: ['./film-view-component.scss'],
})
export class FilmViewComponent {
  readonly filmDetail$ = this.dataService.getFilmList().pipe(map(filmList => {
    const routeId = this.route.snapshot.params['id'];

    return filmList.find(film => {
      return film.episode_id === +routeId;
    });
  }));

  constructor(
      private readonly route: ActivatedRoute,
      private readonly dataService: DataService,
      private readonly router: Router) {}

  hadMultipleProducers(producers: string): boolean {
    return producers.split(', ').length > 1;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
