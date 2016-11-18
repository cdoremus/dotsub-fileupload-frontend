import { FileData } from './../shared/file.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-fileupload',
    templateUrl: './fileupload.component.html'
})
export class FileUploadComponent implements OnInit {
  model: FileData;
  filesToUpload: Array<File>;

  constructor() {
    this.model = new FileData();
    this.filesToUpload = [];
  }

  ngOnInit() {
  }

  formSubmit(form) {
    console.log('Form title: ' + form.title);
    // console.log('Title input: ' + this.title);
    console.log('Model title: ' + this.model.title);
  }

   fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
        console.log('File selected: ', this.filesToUpload);
    }
}
