import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddstuComponent } from './addstu.component';
import { AddstuService } from './addstu.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
const _routes: Routes = [
  { path: '', component: AddstuComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [AddstuService],
  declarations: [AddstuComponent]
})
export class AddstuModule { }
