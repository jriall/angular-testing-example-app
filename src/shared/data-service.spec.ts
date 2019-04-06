import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, TestBed} from '@angular/core/testing';
import {of as observableOf} from 'rxjs';
import {STAR_WARS_API_ROOT} from './constants';
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

const MOCK_CHARACTER_LIST_RESPONSE = {
  count: 87,
  next: null,
  previous: null,
  results: MOCK_CHARACTER_LIST,
};

const CHARACTER_LIST_ENDPOINT = `${STAR_WARS_API_ROOT}people/`;

/**
 * Testing http request is actually quite straightforward once you familiarise
 * yourself with the basic principles of the http testing controller. Rather
 * than go into extensive detail on the below tests, the below link does a great
 * job of explaining the basics:
 *
 * https://medium.com/@Jestfer/testing-http-requests-in-angular-with-httpclienttestingmodule-3880ceac74cf
 */
describe('The data service', () => {
  let dataService: DataService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [DataService],
        })
        .compileComponents();

    dataService = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('sends a get request when getCharacterList() is called', () => {
    dataService.getCharacterList().subscribe();
    const req = httpMock.expectOne(CHARACTER_LIST_ENDPOINT, 'call to api');

    expect(req.request.url).toBe(CHARACTER_LIST_ENDPOINT);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('gets a characterList when getCharacterList() is called', () => {
    dataService.getCharacterList().subscribe(characterList => {
      expect(characterList).toEqual(MOCK_CHARACTER_LIST);
    });

    const req = httpMock.expectOne(CHARACTER_LIST_ENDPOINT, 'call to api');
    req.flush(MOCK_CHARACTER_LIST_RESPONSE);
  });

  it('shares the response and does not refetch from the server for multiple ' +
         'subscribers',
     () => {
       dataService.getCharacterList().subscribe();
       dataService.getCharacterList().subscribe();
       const req = httpMock.expectOne(CHARACTER_LIST_ENDPOINT, 'call to api');

       req.flush({});
     });

  it('refetches the user when the refetchCurrentUser method is called', () => {
    dataService.getCharacterList().subscribe();
    dataService.refetchCharacterList();
    const requests = httpMock.match(CHARACTER_LIST_ENDPOINT);

    expect(requests.length).toBe(2);
  });

  it('throws the error encountered when getUser() fails', () => {
    dataService.getCharacterList().subscribe(() => {
      fail();
    }, () => {});

    httpMock.expectOne(CHARACTER_LIST_ENDPOINT)
        .error(new ErrorEvent('Some error'));
  });
});
