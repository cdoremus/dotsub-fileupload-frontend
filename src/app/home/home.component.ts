import { FileData } from './../shared/file.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // list of all file data to be displayed in FileDataTable component
  fileDataList: Array<FileData>;

  constructor() {
  }

  ngOnInit() {
    console.log('Hello Home');
    this.fileDataList = [];
  }

  uploadedFileRecordsChanged(event) {
    console.log('uploadedFileRecords() called with event: ', event);
    this.fileDataList = event;
  }
}
