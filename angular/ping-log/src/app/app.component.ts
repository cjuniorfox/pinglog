import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { MainComponent } from './main/main.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  constructor(private _http: HttpService) { }

  errorFile(value:boolean){
    this._http.setErrorFile(value);
    console.log(value);
  }
  title = 'ping-log';
}
