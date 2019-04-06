import {Component} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of as observableOf} from 'rxjs';

import {DataService} from '../shared/data-service';

import {CharacterListComponent, getCharacterDescription} from './character-list-component';

const MOCK_CHARACTER_LIST = [
  {
    birth_year: 'test string',
    created: 'test string',
    edited: 'test string',
    eye_color: 'test string',
    films: ['https://swapi.co/api/films/1/', 'https://swapi.co/api/films/2/'],
    gender: 'test string',
    hair_color: 'test string',
    height: 'test string',
    homeworld: 'test string',
    mass: 'test string',
    name: 'Luke Swywalker',
    skin_color: 'test string',
    species: ['test string', 'test string'],
    starships: ['test string', 'test string'],
    url: 'test string',
    vehicles: ['test string', 'test string'],
  },
  {
    birth_year: 'test string',
    created: 'test string',
    edited: 'test string',
    eye_color: 'test string',
    films: ['https://swapi.co/api/films/1/'],
    gender: 'test string',
    hair_color: 'test string',
    height: 'test string',
    homeworld: 'test string',
    mass: 'test string',
    name: 'Darth Vader',
    skin_color: 'test string',
    species: ['test string', 'test string'],
    starships: ['test string', 'test string'],
    url: 'test string',
    vehicles: ['test string', 'test string'],
  },
  {
    birth_year: 'test string',
    created: 'test string',
    edited: 'test string',
    eye_color: 'test string',
    films: ['https://swapi.co/api/films/2/'],
    gender: 'test string',
    hair_color: 'test string',
    height: 'test string',
    homeworld: 'test string',
    mass: 'test string',
    name: 'C-3PO',
    skin_color: 'test string',
    species: ['test string', 'test string'],
    starships: ['test string', 'test string'],
    url: 'test string',
    vehicles: ['test string', 'test string'],
  }
];

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
    url: 'https://swapi.co/api/films/1/',
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
    title: 'The Empire Strikes Back',
    url: 'https://swapi.co/api/films/2/',
    vehicles: ['test string', 'test string'],
  }
];

@Component({template: ''})
class FakeComponent {
}

describe('The character list component', () => {
  const router = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          declarations: [
            CharacterListComponent,
            FakeComponent,
          ],
          imports: [
            MatCardModule,
            RouterTestingModule.withRoutes([
              {
                path: '',
                component: FakeComponent,
              },
              {
                path: 'film/:id',
                component: FakeComponent,
              }
            ]),
          ],
          providers: [
            {
              provide: DataService,
              useValue: {
                getFilmList: () => observableOf(MOCK_FILM_LIST),
              }
            },
            {
              provide: Router,
              useValue: router,
            },
          ],
        })
        .compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CharacterListComponent);
    const component = fixture.debugElement.componentInstance;

    expect(component).toBeTruthy();
  });

  it('renders a card for each character in the characterList', () => {
    const fixture = TestBed.createComponent(CharacterListComponent);
    const component = fixture.componentInstance;
    component.characterList = MOCK_CHARACTER_LIST;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    expect(compiled.querySelectorAll('mat-card').length)
        .toBe(MOCK_CHARACTER_LIST.length);
  });

  it('constructs the filmNameList correctly', () => {
    const fixture = TestBed.createComponent(CharacterListComponent);
    const component = fixture.componentInstance;
    component.characterList = MOCK_CHARACTER_LIST;

    const expectedResult = [
      {
        episode_id: 4,
        name: 'A New Hope',
        url: 'https://swapi.co/api/films/1/',
      },
      {
        episode_id: 5,
        name: 'The Empire Strikes Back',
        url: 'https://swapi.co/api/films/2/',
      }
    ];

    expect(component.filmNameList).toEqual(expectedResult);
  })

  it('displays character names correctly', () => {
    const fixture = TestBed.createComponent(CharacterListComponent);
    const component = fixture.componentInstance;
    component.characterList = MOCK_CHARACTER_LIST;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    const subtitleList = compiled.querySelectorAll('mat-card-subtitle');

    expect(subtitleList[0].innerText).toBe('Good guy');
    expect(subtitleList[1].innerText).toBe('Total doucher');
    expect(subtitleList[2].innerText).toBe('Annoying tin can');
  });

  it('formats character image slugs correctly', () => {
    const fixture = TestBed.createComponent(CharacterListComponent);
    const component = fixture.componentInstance;

    expect(component.getImageSlug('Luke Skywalker'))
        .toBe('/assets/images/luke-skywalker.png');
    expect(component.getImageSlug('R2-D2')).toBe('/assets/images/r2-d2.png');
  });

  it('renders the film names correctly', () => {
    const fixture = TestBed.createComponent(CharacterListComponent);
    const component = fixture.componentInstance;
    component.characterList = MOCK_CHARACTER_LIST;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    const firstCharacterFilmList =
        compiled.querySelectorAll('mat-card:first-of-type .films a');

    expect(firstCharacterFilmList[0].innerText).toBe(MOCK_FILM_LIST[0].title);

    expect(firstCharacterFilmList[1].innerText).toBe(MOCK_FILM_LIST[1].title);
  });

  it('navigates to the correct film page when a user clicks a film button',
     () => {
       const fixture = TestBed.createComponent(CharacterListComponent);
       const component = fixture.componentInstance;
       component.characterList = MOCK_CHARACTER_LIST;
       const compiled = fixture.debugElement.nativeElement;
       fixture.detectChanges();

       const firstCharacterFilmList =
           compiled.querySelectorAll('mat-card:first-of-type .films a');

       firstCharacterFilmList[0].click();
       expect(router.navigate).toHaveBeenCalledWith(['film', 4]);

       firstCharacterFilmList[1].click();
       expect(router.navigate).toHaveBeenCalledWith(['film', 5]);

       expect(router.navigate).toHaveBeenCalledTimes(2);
     })
});

describe('The getCharacterDescription function', () => {
  it('returns the correct description for Darth Vader', () => {
    expect(getCharacterDescription('Darth Vader')).toBe('Total doucher');
  });

  it('returns the correct description for C-3PO', () => {
    expect(getCharacterDescription('C-3PO')).toBe('Annoying tin can');
  });

  it('returns the correct description for R5-D4', () => {
    expect(getCharacterDescription('R5-D4')).toBe('Who?');
  });

  it('returns the correct description for anyone else', () => {
    expect(getCharacterDescription('Luke Skywalker')).toBe('Good guy');
  });
});
