import { FileData } from './../shared/file.model';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

const API_BASE_URL = 'http://localhost:8080';
export const API_UPLOAD_URL = `${API_BASE_URL}/uploadservice/upload`;
export const API_SAVE_URL = `${API_BASE_URL}/uploadservice/saveData`;
export const API_GET_ALL_URL = `${API_BASE_URL}/uploadservice/findAll`;

// Use of these requires that you add the file id to the path
export const API_GET_ONE_BASE_URL = `${API_BASE_URL}/uploadservice/find`;
export const API_DELETE_BASE_URL = `${API_BASE_URL}/uploadservice/delete`;

@Injectable()
export class FileUploadService {

    constructor(private http: Http) {
    }

    upload(file: File): Observable<FileData> {
        console.log(`File to upload in FileUploadService: `, file);
        let formData: FormData = new FormData();
        formData.append('uploadedFile', file);
        // Note: Do NOT add headers
        return this.http.post(API_UPLOAD_URL, formData)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error));
    }

    saveFileMetadata(fileData: FileData) {
        let formData: FormData = new FormData();
        formData.append('id', fileData.id);
        formData.append('title', fileData.title);
        formData.append('description', fileData.description);
        formData.append('filename', fileData.filename);
        formData.append('createDate', fileData.createDate);
        let headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(API_SAVE_URL, formData, options)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error));
    }

    findAllMetadata(): Observable<Array<FileData>> {
        return this.http.get(API_GET_ALL_URL)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error));
    }

    findById(id) {
        return this.http.get(`${API_GET_ONE_BASE_URL}/${id}`)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error));
    }

    delete(id) {
        return this.http.get(`${API_DELETE_BASE_URL}/${id}`)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error));
    }

}
