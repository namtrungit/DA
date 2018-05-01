import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StucontactComponent } from './stucontact.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: StucontactComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  declarations: [StucontactComponent]
})
export class StucontactModule { }
