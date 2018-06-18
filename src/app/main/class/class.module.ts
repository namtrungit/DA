import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './class.component';
import { ClassService } from './class.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
const _routes: Routes = [
  { path: '', component: ClassComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(_routes),
    NgxPaginationModule
  ],
  providers: [ClassService],
  declarations: [ClassComponent]
})
export class ClassModule { }
