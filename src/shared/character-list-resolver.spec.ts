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
  let characterListSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [CharacterListResolver],
        })
        .compileComponents();

    // An example of using a spy to return mock data from a service this class
    // depends on, rather than making the call to the service's real method
    // (which would fire an http request - something we don't want to do in
    // tests).
    characterListSpy = spyOn(TestBed.get(DataService), 'getCharacterList')
                           .and.returnValue(observableOf(MOCK_CHARACTER_LIST));
    characterListResolver = TestBed.get(CharacterListResolver);
  }));

  it('calls the getCharacterList method on the data service', () => {
    characterListResolver.resolve();

    // We can check that methods we've previously spied on have been called at
    // the correct times.
    expect(characterListSpy).toHaveBeenCalled();
  });

  it('returns an observable of the characterList', () => {
    // We can test the return values of observables by subscribing to them and
    // placing our expect block inside of the observer.
    characterListResolver.resolve().subscribe(response => {
      expect(response).toEqual(MOCK_CHARACTER_LIST);
    });
  });

  it('forces a refresh of the characterList', () => {
    const characterListRefreshSpy =
        spyOn(TestBed.get(DataService), 'refetchCharacterList');
    characterListResolver.resolve();

    expect(characterListRefreshSpy).toHaveBeenCalled();
  });
});
