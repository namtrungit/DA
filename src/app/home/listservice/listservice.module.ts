import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListserviceComponent } from './listservice.component';
import { FormsModule } from '@angular/forms';
import { ListserviceService } from './listservice.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: ListserviceComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  providers: [ListserviceService],
  declarations: [ListserviceComponent]
})
export class ListserviceModule { }
