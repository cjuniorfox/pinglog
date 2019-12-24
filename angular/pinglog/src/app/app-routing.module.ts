import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLogComponent } from './main-log/main-log.component';
import { LogFilesComponent } from './log-files/log-files.component';


const routes: Routes = [
  {path:'',component:MainLogComponent},
  {path:'logs',component:LogFilesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
