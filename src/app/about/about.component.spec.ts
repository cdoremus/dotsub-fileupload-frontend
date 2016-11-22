import { TestBed, ComponentFixture } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('About Component', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let component: AboutComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent]
    });

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
  });

  it('should contain div with requirements class', () => {
    fixture.detectChanges();

    let element = fixture.nativeElement.querySelector('.requirements');

    expect(element).toBeDefined();
  });

});
