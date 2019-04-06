import {async, TestBed} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {RouterTestingModule} from '@angular/router/testing';
import {of as observableOf} from 'rxjs';

import {CharacterListComponent} from './character-list-component';
import {CharacterListViewComponent} from './character-list-view-component';
import {DataService} from '../shared/data-service';

describe('The character list view component', () => {
  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          declarations: [
            CharacterListViewComponent,
            CharacterListComponent,
          ],
          imports: [
            MatCardModule,
            RouterTestingModule,
          ],
          providers: [
            {
              provide: DataService,
              useValue: {
                getCharacterList: () => observableOf([]),
                getFilmList: () => observableOf([]),
              }
            },
          ],
        })
        .compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CharacterListViewComponent);
    const component = fixture.debugElement.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should render the header', () => {
    const fixture = TestBed.createComponent(CharacterListViewComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1')).toBeTruthy();
  });

  it('should render the header text correctly', () => {
    const fixture = TestBed.createComponent(CharacterListViewComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1').innerText)
        .toBe('Star Wars Character List');
  });

  it('should render the characterList component', () => {
    const fixture = TestBed.createComponent(CharacterListViewComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('character-list')).toBeTruthy();
  });
});
