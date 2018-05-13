import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListbillComponent } from './listbill.component';
import { ListbillService } from './listbill.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: ListbillComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [ListbillService],
  declarations: [ListbillComponent]
})
export class ListbillModule { }
