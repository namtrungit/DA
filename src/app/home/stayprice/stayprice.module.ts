import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaypriceComponent } from './stayprice.component';
import { StaypriceService } from './stayprice.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: StaypriceComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [StaypriceService],
  declarations: [StaypriceComponent]
})
export class StaypriceModule { }
