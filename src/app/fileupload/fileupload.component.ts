import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileUploadService } from './fileupload.service';
import { FileData } from './../shared/file.model';

@Component({
    selector: 'my-fileupload',
    templateUrl: './fileupload.component.html',
    providers: [ FileUploadService ]
})
export class FileUploadComponent implements OnInit, OnDestroy {
  // file data in form
  currentFileData: FileData;
  // list of all file data to be displayed in FileDataTable component
  fileDataList: Array<FileData>;
  // contains file selected using file control
  filesToUpload: Array<File>;
  // holds success and error messages at top of form
  message: any;
  // flags whether a file upload has occurred
  hasUploadedFile: boolean = false;

  // Observable subscriptions that need to be unsubscribed
  uploadFileSubscription: Subscription;
  submitFileMetadataSubscription: Subscription;
  findAllMetatdataSubscription: Subscription;


  constructor(private uploadService: FileUploadService) {
    this.currentFileData = new FileData();
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.fileDataList = [];
    // initialize metatdata for list from back end
    this.findAllMetatdata();
  }

  ngOnDestroy() {
      // unsubscribe from Observable subscriptions
      if (this.uploadFileSubscription) {
          this.uploadFileSubscription.unsubscribe();
      }
      if (this.findAllMetatdataSubscription) {
          this.findAllMetatdataSubscription.unsubscribe();
      }
      if (this.submitFileMetadataSubscription) {
          this.submitFileMetadataSubscription.unsubscribe();
      }
  }

  submitFileMetadata(form) {
     this.submitFileMetadataSubscription = this.uploadService.saveFileMetadata(this.currentFileData)
        .subscribe( resp => {
            console.log('submitFileMetadata() response: ', resp);
            // resp holds FileData component including data added on back end
            this.message = resp; // TODO: format message as string
        },
        error => {
            console.log('Error submitting file metatdata', error);
            this.message = error; // TODO: format message as string
        },
        // on completion, refresh metatdata list
        () => this.findAllMetatdata());
  }

  findAllMetatdata() {
      this.findAllMetatdataSubscription = this.uploadService.findAllMetadata()
        .subscribe( resp => {
            this.fileDataList = resp;
        },
        error => {
            console.log('Error finding all file metatdata', error);
            this.message = error; // TODO: format message as string
        });
  }

   uploadFile(fileInput: any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
        // console.log('File selected: ', this.filesToUpload);
        if (this.filesToUpload && this.filesToUpload.length > 0) {
            let file: File = this.filesToUpload[0];
            this.uploadFileSubscription = this.uploadService.upload(file)
                .subscribe(resp => {
                    this.currentFileData = resp;
                    this.hasUploadedFile = true;
                    this.message = `Upload success for file '${file.name}'`;
                    console.log(this.message);
                },
                error => {
                    console.log('Error finding all file metatdata', error);
                    this.message = error; // TODO: format message as string
                });
        } else {
            this.message = 'No upload files available';
            console.log(this.message);
        }
    }
}
