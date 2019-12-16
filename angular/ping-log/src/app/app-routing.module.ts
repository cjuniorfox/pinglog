import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { BrowseFilesComponent } from './browse-files/browse-files.component';


const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'browse-files', component: BrowseFilesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
