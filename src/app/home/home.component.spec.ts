import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FileDataTableComponent } from './../filedatatable/filedatatable.component';
import { FileUploadComponent } from './../fileupload/fileupload.component';
import { FileUploadService } from './../fileupload/fileupload.service';

import { TestBed, ComponentFixture } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('Home Component', () => {
  const html = '<my-home></my-home>';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserModule, FormsModule ],
      declarations: [HomeComponent, FileUploadComponent, FileDataTableComponent, TestComponent],
      providers: [
        FileUploadService,
        BaseRequestOptions,
        MockBackend,
          {
            provide: Http,
            useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions],
          },

        ]
      });
    TestBed.overrideComponent(TestComponent, { set: { template: html }});
  });

  it('should display "Home Works!"', () => {
    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Home Works!');
  });

});

@Component({selector: 'my-test', template: ''})
class TestComponent { }
