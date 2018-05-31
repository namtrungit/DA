import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListreportComponent } from './listreport.component';
import { ListreportService } from './listreport.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: ListreportComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [ListreportService],
  declarations: [ListreportComponent]
})
export class ListreportModule { }
