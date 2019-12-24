import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Status } from '../model/status.model';

@Component({
  selector: 'app-logs',
  templateUrl: './log-files.component.html',
  styleUrls: ['./log-files.component.scss']
})
export class LogFilesComponent implements OnInit {

  constructor(private _http: HttpClientService) { }
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
