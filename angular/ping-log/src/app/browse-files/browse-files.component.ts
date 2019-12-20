import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Status } from '../status.model'

@Component({
  selector: 'app-browse-files',
  templateUrl: './browse-files.component.html',
  styleUrls: ['./browse-files.component.scss']
})
export class BrowseFilesComponent implements OnInit {

  constructor(private _http: HttpService) { }
  fileList: String[];
  errorFilelist: String[];
  log: Status[];
  errorLog: Status[];
  ngOnInit() {
    this._http.getCompleteFileList().subscribe( data => {
      this.fileList = data.reverse();
    });
    this._http.getErrorFileList().subscribe( data => {
      this.errorFilelist = data.reverse();
    })
  }

  openFile(file:String){
    this._http.getLogFile(file).subscribe( data => {
      this.log = data;
    })
  }

}
