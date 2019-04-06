import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

import {DataService} from './data-service';

@Component({
  selector: 'film-view',
  template: `
    <button (click)="goBack()">Back</button>
    <ng-container *ngIf="filmDetail$ | async as filmDetail">
      <h1>{{ filmDetail.title }}</h1>
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
