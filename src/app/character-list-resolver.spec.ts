import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, TestBed} from '@angular/core/testing';
import {of as observableOf} from 'rxjs';

import {CharacterListResolver} from './character-list-resolver';
import {DataService} from './data-service';

const MOCK_CHARACTER_LIST = [{
  birth_year: 'test string',
  created: 'test string',
  edited: 'test string',
  eye_color: 'test string',
  films: ['test string', 'test string'],
  gender: 'test string',
  hair_color: 'test string',
  height: 'test string',
  homeworld: 'test string',
  mass: 'test string',
  name: 'test string',
  skin_color: 'test string',
  species: ['test string', 'test string'],
  starships: ['test string', 'test string'],
  url: 'test string',
  vehicles: ['test string', 'test string'],
}];

describe('The character list resolver', () => {
  let characterListResolver: CharacterListResolver;
  let characterListSpy: any;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [CharacterListResolver],
        })
        .compileComponents();

    characterListSpy = spyOn(TestBed.get(DataService), 'getCharacterList')
                           .and.returnValue(observableOf(MOCK_CHARACTER_LIST));
    characterListResolver = TestBed.get(CharacterListResolver);
  }));

  it('calls the getCharacterList method on the data service', () => {
    characterListResolver.resolve();
    expect(characterListSpy).toHaveBeenCalled();
  });

  it('returns an observable of the characterList', () => {
    characterListResolver.resolve().subscribe(response => {
      expect(response).toEqual(MOCK_CHARACTER_LIST);
    });
  });
});
