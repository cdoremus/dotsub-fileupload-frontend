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

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserModule, FormsModule ],
      declarations: [HomeComponent, FileUploadComponent, FileDataTableComponent],
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

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

    it('should contain a my-fileupload element', () => {

      fixture.detectChanges();

      let element = fixture.nativeElement.querySelector('my-fileupload');

      expect(element).toBeDefined();
    });

    it('should contain a my-filedatatable element', () => {

      fixture.detectChanges();

      let element = fixture.nativeElement.querySelector('my-filedatatable');

      expect(element).toBeDefined();
    });


});
