import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, TestBed} from '@angular/core/testing';
import {of as observableOf} from 'rxjs';

import {DataService} from './data-service';
import {FilmListResolver} from './film-list-resolver';

const MOCK_FILM_LIST = [];

/** See the character list resolver for similar comments on these tests. */
describe('The film list resolver', () => {
  let filmListResolver: FilmListResolver;
  let filmListSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [FilmListResolver],
        })
        .compileComponents();

    filmListSpy = spyOn(TestBed.get(DataService), 'getFilmList')
                      .and.returnValue(observableOf(MOCK_FILM_LIST));
    filmListResolver = TestBed.get(FilmListResolver);
  }));

  it('calls the getFilmList method on the data service', () => {
    filmListResolver.resolve();
    expect(filmListSpy).toHaveBeenCalled();
  });

  it('returns an observable of the filmList', () => {
    filmListResolver.resolve().subscribe(response => {
      expect(response).toEqual(MOCK_FILM_LIST);
    });
  });
});
