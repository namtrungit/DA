import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FacultyComponent} from './faculty.component';
import { FacultyService } from './faculty.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
const _routes: Routes = [
  {path: '', component: FacultyComponent}
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  providers: [FacultyService],
  declarations: [FacultyComponent]
})
export class FacultyModule { }
