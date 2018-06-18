import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListstuComponent } from './liststu.component';
import { ListstuService } from './liststu.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
const _routes: Routes = [
  { path: '', component: ListstuComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes),
    NgxPaginationModule
  ],
  providers: [ListstuService],
  declarations: [ListstuComponent]
})
export class ListstuModule { }
