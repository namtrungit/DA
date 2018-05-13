import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillComponent } from './bill.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BillService } from './bill.service';
const _routes: Routes = [
  {path: '', component: BillComponent, children: [
    { path: '', redirectTo: 'listbill', pathMatch: 'full' },
    { path: 'listbill', loadChildren: './listbill/listbill.module#ListbillModule' },
    { path: 'addbill', loadChildren: './addbill/addbill.module#AddbillModule' },
  ]}
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [BillService],
  declarations: [BillComponent]
})
export class BillModule { }
