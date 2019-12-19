import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Status } from '../status.model';

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
    let logs = 10;
    //Obtem lista de arquivos
    this._http.getFileList().subscribe(data => {
      let files = data;
      let l : Status[];
      //Após isso, recebe os dois últimos arquivos
      let c = 0;
      for (let i = (files.length < logs ? 0 : files.length - logs - 1); i < files.length; i++) {
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
