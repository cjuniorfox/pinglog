import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from './status.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  urls = {
    baseContext: "http://openwrt.lan:8000/",
    currentStatus: 'http://openwrt.lan:8000/status.json',
    fileList: 'log.json',
    errorFileList: 'error.json',
    endPointLog: 'http://openwrt.lan:8000/'
  };

  errorFile = false;

  constructor(private _http: HttpClient) { }

  setErrorFile(errorFile:boolean){
    this.errorFile = errorFile;
  }

  getFileList() {
    let fileList = this.urls.fileList;
    if (this.errorFile){
      fileList = this.urls.errorFileList;
    }
    return this._http.get<String[]>(this.urls.baseContext + fileList);
  }

  getCompleteFileList(){
    return this._http.get<String[]>(this.urls.baseContext + this.urls.fileList);
  }

  getErrorFileList() {
    return this._http.get<String[]>(this.urls.baseContext + this.urls.errorFileList);
  }

  getMainStatus() {
    return this._http.get<Status>(this.urls.currentStatus);
  }

  getLogFile(logFile: String) {
    return this._http.get<Status[]>(this.urls.endPointLog + logFile);
  }

}
