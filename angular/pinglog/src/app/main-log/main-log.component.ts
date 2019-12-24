import { Component, OnInit } from '@angular/core';
import { Status } from '../model/status.model';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-main-log',
  templateUrl: './main-log.component.html',
  styleUrls: ['./main-log.component.scss']
})
export class MainLogComponent implements OnInit {

  currentStatus: Status;

  logStatus: Status[];

  constructor(private _http: HttpClientService) { }

  ngOnInit() {
    this.getCurrentStatus();
    this.getLogStatus();
    setInterval(() => {
      this.getCurrentStatus();
      this.getLogStatus();
    }, 5000);
  }
  getLogStatus() {
    let logs = 4;
    //Obtem lista de arquivos
    this._http.getFileList().subscribe(data => {
      let files = data;
      let l : Status[];
      //Após isso, recebe os dois últimos arquivos
      let c = 0;
      for (let i = (files.length < logs ? 0 : files.length - logs ); i < files.length; i++) {
        this._http.getLogFile(files[i]).subscribe(data => {
          if (c == 0) {
            l = data;
          } else {
            l = l.concat(data);
          }
          c = +1;
          if (i == files.length - 1 && this.logStatus != l.reverse()){
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
    switch (status.status){
      case "ok":
        return "status-ok";
        break;
      case "timeout":
        return "status-fail";
        break;
      default :
        return "status-attention";
        break; 
    }
  }
}
