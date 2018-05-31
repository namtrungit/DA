import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddreportComponent } from './addreport.component';
import { AddreportService } from './addreport.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
const _routes: Routes = [
  { path: '', component: AddreportComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(_routes),
    FormsModule,
  ],
  providers: [AddreportService],
  declarations: [AddreportComponent]
})
export class AddreportModule { }
