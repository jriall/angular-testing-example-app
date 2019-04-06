import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of as observableOf} from 'rxjs';

import {DataService} from './data-service';
import {FilmGuard} from './film-guard';

const MOCK_FILM_LIST = [{
  characters: ['test string', 'test string'],
  created: 'test string',
  director: 'test string',
  edited: 'test string',
  episode_id: 1,
  opening_crawl: 'test string',
  planets: ['test string', 'test string'],
  producer: 'test string',
  release_date: 'test string',
  species: ['test string', 'test string'],
  starships: ['test string', 'test string'],
  title: 'test string',
  url: 'test string',
  vehicles: ['test string', 'test string'],
}];

@Component({template: ''})
class FakeComponent {
}

describe('The film guard', () => {
  let filmGuard: FilmGuard;
  let filmListSpy: jasmine.Spy;
  const router = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          declarations: [FakeComponent],
          imports: [
            HttpClientTestingModule,
            RouterTestingModule.withRoutes([{
              path: '',
              component: FakeComponent,
            }]),
          ],
          providers: [
            DataService,
            FilmGuard,
            {
              provide: Router,
              useValue: router,
            }
          ],
        })
        .compileComponents();

    filmGuard = TestBed.get(FilmGuard);
    filmListSpy = spyOn(TestBed.get(DataService), 'getFilmList')
                      .and.returnValue(observableOf(MOCK_FILM_LIST));
  }));

  it('calls the getFilmList method on the data service when canActivate is' +
         ' called',
     () => {
       const route = new ActivatedRouteSnapshot();
       route.params = {id: '2'};

       filmGuard.canActivate(route);
       expect(filmListSpy).toHaveBeenCalled();
     });

  it('returns true when the route params id is a valid episode id in the ' +
         'film list',
     () => {
       const route = new ActivatedRouteSnapshot();
       route.params = {id: '1'};

       filmGuard.canActivate(route).subscribe(result => {
         expect(result).toBe(true);
       });
     });

  it('does not redirect the user to the homepage when the route params id is ' +
         'a valid episode id in the film list',
     () => {
      const route = new ActivatedRouteSnapshot();
      route.params = {id: '1'};

      filmGuard.canActivate(route);
      expect(router.navigate).not.toHaveBeenCalled();
     });

  it('returns false when the route params id is not a valid episode id in the' +
         ' film list',
     () => {
       const route = new ActivatedRouteSnapshot();
       route.params = {id: '10'};

       filmGuard.canActivate(route).subscribe(result => {
         expect(result).toBe(false);
       });
     });

  it('redirects the user to the homepage when the route params id is not ' +
         'a valid episode id in the film list',
     () => {
      const route = new ActivatedRouteSnapshot();
      route.params = {id: '1'};

      filmGuard.canActivate(route);
      expect(router.navigate).toHaveBeenCalledWith(['']);
     });
});
