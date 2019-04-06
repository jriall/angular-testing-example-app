import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [RouterTestingModule],
          declarations: [AppComponent],
        })
        .compileComponents();
  }));

  /**
   * The most basic component test you can do - simply testing the component
   * can be instantiated.
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * Test the router outlet is rendered. Instructive to see how you can use
   * query selectors to test DOM elements. We can grab elements and test their
   * existance, contents, number, attributes, call events on them etc.
   */
  it('should render the router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
