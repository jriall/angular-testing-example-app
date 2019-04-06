import {Component} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of as observableOf} from 'rxjs';
import {ReleaseDatePipe} from 'src/shared/release-date-pipe';

import {DataService} from '../shared/data-service';

import {FilmViewComponent} from './film-view-component';

/**
 * See the comments in the character list component test - many of the comments
 * there will also apply to this test.
 */
const MOCK_FILM_LIST = [
  {
    characters: ['test string', 'test string'],
    created: 'test string',
    director: 'test string',
    edited: 'test string',
    episode_id: 4,
    opening_crawl: 'test string',
    planets: ['test string', 'test string'],
    producer: 'Producer Name',
    release_date: '2017-05-05',
    species: ['test string', 'test string'],
    starships: ['test string', 'test string'],
    title: 'A New Hope',
    url: 'test string',
    vehicles: ['test string', 'test string'],
  },
  {
    characters: ['test string', 'test string'],
    created: 'test string',
    director: 'test string',
    edited: 'test string',
    episode_id: 5,
    opening_crawl: 'test string',
    planets: ['test string', 'test string'],
    producer: 'First Producer Name, Second Producer Name',
    release_date: '2017-05-05',
    species: ['test string', 'test string'],
    starships: ['test string', 'test string'],
    title: 'A New Hope',
    url: 'test string',
    vehicles: ['test string', 'test string'],
  }
];

@Component({template: ''})
class FakeComponent {
}

describe('The character list view component', () => {
  let routeId = '4';
  const router = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          declarations: [
            FakeComponent,
            FilmViewComponent,
            ReleaseDatePipe,
          ],
          imports: [
            MatCardModule,
            RouterTestingModule.withRoutes([{
              path: '',
              component: FakeComponent,
            }]),
          ],
          providers: [
            {
              provide: DataService,
              useValue: {
                getFilmList: () => observableOf(MOCK_FILM_LIST),
              },
            },
            // Mocking providers like Activated routes can be invaluable for
            // testing logic which requires route data etc. Mocking the required
            // values can often be tricky - the Angular API documentation is
            // your friend.
            {
              provide: ActivatedRoute,
              useValue: {
                snapshot: {
                  params: {
                    id: routeId,
                  },
                },
              },
            },
            {
              provide: Router,
              useValue: router,
            }
          ],
        })
        .compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(FilmViewComponent);
    const component = fixture.debugElement.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should render the film title correctly', () => {
    const fixture = TestBed.createComponent(FilmViewComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1').innerText)
        .toBe('Episode 4 - A New Hope');
  });

  /**
   * The below two tests are indirectly testing that the hadMultipleProducers
   * is returning the correct values, and that we are using the return value
   * correctly to detemine whether to pluralise 'producer'.
   */
  it('should render the producer section title in the singular if there is ' +
         'only one producer',
     () => {
       const fixture = TestBed.createComponent(FilmViewComponent);
       fixture.detectChanges();
       const compiled = fixture.debugElement.nativeElement;

       expect(compiled.querySelector('ul li:nth-child(2) h2').innerText)
           .toBe('Producer');

       routeId = '5';
     });

  it('should render the producer section title in the plural if there are ' +
         'more than one producers',
     () => {
       const fixture = TestBed.createComponent(FilmViewComponent);
       fixture.detectChanges();
       const compiled = fixture.debugElement.nativeElement;

       expect(compiled.querySelector('ul li:nth-child(2) h2').innerText)
           .toBe('Producers');
     });

  it('should navigate to the homepage when the user clicks the back button',
     () => {
       const fixture = TestBed.createComponent(FilmViewComponent);
       fixture.detectChanges();
       const compiled = fixture.debugElement.nativeElement;
       compiled.querySelector('button').click();

       expect(router.navigate).toHaveBeenCalledWith(['/']);
     });
});
