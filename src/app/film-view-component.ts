import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

import {DataService} from './data-service';

@Component({
  selector: 'film-view',
  template: `
    <button (click)="goBack()">Back</button>
    <ng-container *ngIf="filmDetail$ | async as filmDetail">
      <h1>Episode {{filmDetail_episode_id }} - {{ filmDetail.title }}</h1>
      <ul>
        <li>
          <h2>Director</h2>
          <p>{{ filmDetail.director }}</p>
        </li>
        <li>
          <h2>Release date</h2>
          <p>{{ filmDetail.release_date | releaseDate:'long' }}</p>
        </li>
        <li>
          <h2>Plot introduction</h2>
          <p>{{ filmDetail.opening_crawl }}</p>
        </li>
      </ul>
    </ng-container>
  `,
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

  goBack() {
    this.router.navigate(['/']);
  }
}
