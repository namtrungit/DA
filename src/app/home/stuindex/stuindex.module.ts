import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StuindexComponent } from './stuindex.component';
import { StudentService } from '../../main/student/student.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  {path: '', component: StuindexComponent}
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [StudentService],
  declarations: [StuindexComponent]
})
export class StuindexModule { }
