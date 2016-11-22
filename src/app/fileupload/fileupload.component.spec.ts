import { FileData } from './../shared/file.model';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FileDataTableComponent } from './../filedatatable/filedatatable.component';
import { FileUploadComponent } from './../fileupload/fileupload.component';
import { FileUploadService } from './../fileupload/fileupload.service';
import { Observable } from 'rxjs';

import { TestBed, ComponentFixture } from '@angular/core/testing';


describe('FileUploadComponent', () => {
  let fixture: ComponentFixture<FileUploadComponent>;
  let component: FileUploadComponent;

  describe('Test component logic', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ BrowserModule, FormsModule ],
        declarations: [ FileUploadComponent, FileDataTableComponent ],
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
        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;
        TestBed.compileComponents();
    });

    it('should set message, currentFileData and hasUploadedFile when uploadFile() is called ',
      () => {
      let service = fixture.debugElement.injector.get(FileUploadService);
      let file: FileData = new FileData(0, 'File 1');
      let file$: Observable<FileData> = Observable.of(file);
      let fileInput = {target: { files: [file]}};
      spyOn(service, 'upload').and.returnValue(file$);
      component.uploadFile(fileInput);

      fixture.detectChanges();

      expect(component.uploadFileSubscription).toBeDefined();

      expect(component.hasUploadedFile).toBeTruthy();
      expect(component.message).toBeDefined();
      expect(component.currentFileData).toBe(file);
    });

    it('should set fileDataList when caling findAllMetatdata()',() => {
      let service = fixture.debugElement.injector.get(FileUploadService);
      let files: Array<FileData> = [];
      files.push(new FileData(1, 'FIle 1'));
      files.push(new FileData(2, 'FIle 2'));
      spyOn(service, 'findAllMetadata').and.returnValue(Observable.of(files));
      component.findAllMetatdata();
      fixture.detectChanges();

      expect(component.fileDataList.length).toBe(2);
    });

    it('should NOT set fileDataList when caling findAllMetatdata() after error thrown',() => {
      let service = fixture.debugElement.injector.get(FileUploadService);
      let error: Error = new Error('Problem');
      spyOn(service, 'findAllMetadata').and.returnValue(Observable.throw(error));
      component.findAllMetatdata();
      fixture.detectChanges();

      expect(component.fileDataList.length).toBe(0);
      expect(component.message).toBe(error);
    });

    it('should unsubscribe from findAllMetatdataSubscription when component is destroyed',() => {
      let service = fixture.debugElement.injector.get(FileUploadService);
      let files: Array<FileData> = [];
      files.push(new FileData(1, 'FIle 1'));
      files.push(new FileData(2, 'FIle 2'));
      spyOn(service, 'findAllMetadata').and.returnValue(Observable.of(files));
      fixture.detectChanges();
      spyOn(component.findAllMetatdataSubscription, 'unsubscribe');
      fixture.destroy();

      expect(component.findAllMetatdataSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should set message when submitFileMetadata is called successfully',() => {
      let service = fixture.debugElement.injector.get(FileUploadService);
      let file: FileData = new FileData(0, 'File 1', '');
      let newFile: FileData = Object.assign({}, file, {id: 1} );
      spyOn(service, 'saveFileMetadata').and.returnValue(Observable.of(newFile));
      spyOn(component, 'findAllMetatdata');
      component.submitFileMetadata(file);
      fixture.detectChanges();

      expect(component.findAllMetatdata).toHaveBeenCalled();
      expect(component.message.id).toBe(1);
    });

 });

  describe('Test template', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ BrowserModule, FormsModule ],
        declarations: [FileUploadComponent, FileDataTableComponent, TestComponent],
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
        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;
    });

    it('should display root element with form-container id', () => {
      const testFixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
      testFixture.detectChanges();

      let rootEl = testFixture.nativeElement.querySelector('#form-container');

      expect(rootEl).toBeDefined();
    });

    it('should display message if "message" exists', () => {
      let message = 'A message';
      component.message = message;
      fixture.detectChanges();

      let element = fixture.nativeElement.querySelector('#uploadMessage');

      expect(element).toBeDefined();
      expect(element.textContent).toContain(message);
    });

    it('should NOT display message div if "message" field is undefined', () => {
      let message = undefined;
      component.message = message;
      fixture.detectChanges();

      let element = fixture.nativeElement.querySelector('#uploadMessage');

      expect(element).toBeNull();
    });

    it('should contain a my-filedatatable element', () => {

      fixture.detectChanges();

      let element = fixture.nativeElement.querySelector('my-filedatatable');

      expect(element).toBeDefined();
    });

    it('should NOT contain an element with id "upload-data-container" initially', () => {

      fixture.detectChanges();

      let element = fixture.nativeElement.querySelector('#upload-data-container');

      expect(element).toBeNull();
    });

  });
});

@Component({selector: 'my-test',
  template: '<my-fileupload></my-fileupload>'})
class TestComponent { }
