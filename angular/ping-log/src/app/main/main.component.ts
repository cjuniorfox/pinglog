import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Status } from '../status.model';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  currentStatus: Status;

  logStatus: Status[];

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.getCurrentStatus();
    this.getLogStatus();
    setInterval(() => {
      this.getCurrentStatus();
      this.getLogStatus();
    }, 5000);
  }
  getLogStatus() {
    //Obtem lista de arquivos
    this._http.getFileList().subscribe(data => {
      let files = data;
      let l : Status[];
      //Após isso, recebe os dois últimos arquivos
      let c = 0;
      for (let i = (files.length < 2 ? 0 : files.length - 2); i < files.length; i++) {
        this._http.getLogFile(files[i]).subscribe(data => {
          if (c == 0) {
            l = data;
          } else {
            l = l.concat(data);
          }
          c = +1;
          if (i == files.length - 1){
            this.logStatus = l;
          }
        });
      }
    });
  }

  getCurrentStatus() {
    this._http.getMainStatus().subscribe(data => {
      this.currentStatus = data;
    });
  }

  getStatusClass(status:Status) {
    if (status && status.status == "ok") {
      return "status-ok";
    } else {
      return "status-fail";
    };
  }

}
