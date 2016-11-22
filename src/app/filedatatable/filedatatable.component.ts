import { FileData } from './../shared/file.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'my-filedatatable',
    styleUrls: ['./filedatatable.component.css'],
    templateUrl: './filedatatable.component.html'
})
export class FileDataTableComponent implements OnInit {

    @Input()
    fileDataList: Array<FileData> = [];

    constructor() { }

    ngOnInit() { }
}
