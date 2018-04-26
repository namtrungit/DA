import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
const _routes: Routes = [
  {
    path: '', component: StudentComponent, children: [
      { path: '', redirectTo: 'liststu', pathMatch: 'full' },
      { path: 'liststu', loadChildren: './liststu/liststu.module#ListstuModule' },
      { path: 'addstu', loadChildren: './addstu/addstu.module#AddstuModule' }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  declarations: [StudentComponent]
})
export class StudentModule { }
