import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { IndexService } from './index.service';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
const _routes: Routes = [
  { path: '', component: IndexComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(_routes),
    HttpModule
  ],
  providers: [IndexService],
  declarations: [IndexComponent]
})
export class IndexModule { }
