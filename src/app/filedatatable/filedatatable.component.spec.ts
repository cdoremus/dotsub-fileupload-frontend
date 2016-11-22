import { FileData } from './../shared/file.model';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FileDataTableComponent } from './filedatatable.component';


describe('FileDataTableComponent', () => {
  let fixture: ComponentFixture<FileDataTableComponent>;
  let component: FileDataTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileDataTableComponent]
    });

    fixture = TestBed.createComponent(FileDataTableComponent);
    component = fixture.componentInstance;
  });


  it('should define table in the template if fileDataList contains one record', () => {
    let fileList: Array<FileData> = [];
    fileList.push(new FileData(1, 'File 1'));
    component.fileDataList = fileList;
    fixture.detectChanges();

    let element = fixture.nativeElement.querySelector('table');

    expect(element).toBeDefined();

  });

  it('should not define anything in the template if fileDataList is undefined', () => {
    component.fileDataList = undefined;
    fixture.detectChanges();

    let elements = fixture.nativeElement.querySelectorAll('div');

    expect(elements[0]).toBeUndefined();
  });

  it('should define three table rows in the template if fileDataList contains two record', () => {
    let fileList: Array<FileData> = [];
    fileList.push(new FileData(1, 'File 1'));
    fileList.push(new FileData(2, 'File 2'));
    component.fileDataList = fileList;
    fixture.detectChanges();

    let rows = fixture.nativeElement.querySelectorAll('table tr');

    // first row contains table headers
    expect(rows.length).toBe(3);

  });

});
