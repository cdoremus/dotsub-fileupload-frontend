import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileUploadService } from './fileupload.service';
import { FileData } from './../shared/file.model';

@Component({
    selector: 'my-fileupload',
    styleUrls: [ './fileupload.component.scss' ],
    templateUrl: './fileupload.component.html'
})
export class FileUploadComponent implements OnInit, OnDestroy {
  // Event to signal parent that file records have changed
  // when this component is initialized and when a new record is created
  @Output() fileRecordsChanged: EventEmitter<Array<FileData>> = new EventEmitter<Array<FileData>>();
  // file data in form
  currentFileData: FileData;
  // contains file selected using file control
  filesToUpload: Array<File>;
  // holds success and error messages at top of form
  message: any;
  // flags whether a file upload has occurred
  hasUploadedFile: boolean = false;

  // Observable subscriptions that need to be unsubscribed on destroy
  uploadFileSubscription: Subscription;
  submitFileMetadataSubscription: Subscription;
  findAllMetatdataSubscription: Subscription;


  constructor(private uploadService: FileUploadService) {
    this.currentFileData = new FileData();
    this.filesToUpload = [];
  }

  ngOnInit() {
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
      // validate that title and description are filled in
      if (!this.currentFileData.title || !this.currentFileData.description) {
          this.message = 'Title and Description are required';
          return;
      }
     this.submitFileMetadataSubscription = this.uploadService.saveFileMetadata(this.currentFileData)
        .subscribe( (file: FileData) => {
            console.log('submitFileMetadata() file metadata: ', file);
            // file holds FileData component including data added on back end
            this.message = `File '${file.filename}' data record submitted successfully.`;
        },
        error => {
            console.log(`Error submitting file metatdata for for ${this.currentFileData.filename}`, error);
            this.message = this._parseErrorMessage(`Error submitting file metatdata record for ${this.currentFileData.filename}:`, error);
        },
        // on completion, refresh metatdata list
        () => this.findAllMetatdata());
  }

  findAllMetatdata() {
      this.findAllMetatdataSubscription = this.uploadService.findAllMetadata()
        .subscribe( resp => {
            this.fileRecordsChanged.emit(resp);
        },
        error => {
            console.log('Error finding all file records', error);
            this.message = this._parseErrorMessage(`Error finding all uploaded file records:`, error);
        });
  }

   uploadFile(fileInput: any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
        // console.log('File selected: ', this.filesToUpload);
        if (this.filesToUpload && this.filesToUpload.length > 0) {
            let file: File = this.filesToUpload[0];
            // validate size < 2MB
            if (file.size > 2000000) {
                this.message = `Size of file ${file.name} is too large. Please select a file less than 2MB.`;
                return;
            }
            this.uploadFileSubscription = this.uploadService.upload(file)
                .subscribe(resp => {
                    this.currentFileData = resp;
                    this.hasUploadedFile = true;
                    this.message = `File '${file.name}' uploaded successfully. Please fill in title and description`;
                    console.log(this.message);
                },
                error => {
                    console.log('Error uploading file file metatdata', error);
                    this.message = this._parseErrorMessage(`Error uploading file ${file.name} with size ${file.size}:`, error);
                });
        } else {
            this.message = 'No upload files available';
            console.log(this.message);
        }
    }

    _parseErrorMessage(message: string, error: any): string {
        try { // try to parse out message
            let json = JSON.parse(error._body);
            console.log('Error body parsed', json);
            let msg = `${message}: ${json.message}`;
            console.log(`Parsed message returned: ${msg}`);
            return msg ;
        } catch (e) {
            console.log(`Problem parsing error message`, e);
            return `Error finding all uploaded file records`;
        }

    }
}
