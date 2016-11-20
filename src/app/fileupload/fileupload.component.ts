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
  model: FileData;
  fileDataList: Array<FileData>;
  filesToUpload: Array<File>;
  message: any;
  private uploadFileSubscription: Subscription;

  constructor(private uploadService: FileUploadService) {
    this.model = new FileData();
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.fileDataList = [];
    this.findAllMetatdata();
  }

  ngOnDestroy() {
      if (this.uploadFileSubscription) {
          this.uploadFileSubscription.unsubscribe();
      }
  }

  formSubmit(form) {
    console.log('Form title: ' + form.title);
    console.log('Form file: ' + form.filename);
    console.log('Model title: ' + this.model.title);
    if (this.filesToUpload) {
        let file: File = this.filesToUpload[0];
        if (file) {
            console.log('File to upload', file);
            this.uploadFileSubscription = this.uploadService.upload(file)
            .subscribe((resp) => {
                if (resp) {
                    console.log(`Response from Spring web service`, resp);
                    this.message = resp;
                }
            },
                error => {
                    console.log('Error in subscribe: ', error);
                    this.message = error;
                }
            );
        }
    }
  }

  submitFileMetadata(form) {
      this.uploadService.saveFileMetadata(this.model)
        .subscribe( resp => {
            console.log('submitFileMetadata() response: ', resp);
            this.message = resp;
            this.findAllMetatdata();
        },
        error => {
            console.log('Error submitting file metatdata', error);
            this.message = error;
        });
  }

  findAllMetatdata() {
      // fake data
    //   let f1: FileData = new FileData(1, 'title1', 'desc1', 'image1.png', '1/1/2016');
    //   this.fileDataList.push(f1);
    //   let f2: FileData = new FileData(1, 'title2', 'desc2', 'image2.png', '1/2/2016');
    //   this.fileDataList.push(f2);
      this.uploadService.findAllMetadata()
        .subscribe( resp => {
            console.log('findAllMetatdata() response: ', resp);
            this.fileDataList = resp;
        },
        error => {
            console.log('Error finding all file metatdata', error);
            this.message = error;
        });
  }

  uploadXhr(form) {
    if (this.filesToUpload) {
        let file: File = this.filesToUpload[0];
        if (file) {
            console.log('File to upload', file);
            this.uploadService.uploadXhr(file)
            .then(resp => {
                console.log(`XHR response from Spring web service`, resp);
                this.message = resp;
            })
            .catch(error => {
                console.log('Error in XHR promise: ', error);
                this.message = error;
            });
        }
    }
  }

   fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
        console.log('File selected: ', this.filesToUpload);
    }
}
