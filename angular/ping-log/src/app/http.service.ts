import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from './status.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  urls = {
    currentStatus: 'http://openwrt.lan:8000/status.json',
    fileList: 'http://openwrt.lan:8000/log.json',
    errorFileList: 'http://openwrt.lan:8000/error.json',
    endPointLog: 'http://openwrt.lan:8000/'
  };

  constructor(private _http: HttpClient) { }

  getFileList() {
    return this._http.get<String[]>(this.urls.fileList);
  }

  getErrorFileList() {
    return this._http.get<String[]>(this.urls.errorFileList);
  }

  getMainStatus() {
    return this._http.get<Status>(this.urls.currentStatus);
  }

  getLogFile(logFile: String) {
    return this._http.get<Status[]>(this.urls.endPointLog + logFile);
  }
}
