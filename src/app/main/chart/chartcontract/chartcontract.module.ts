import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartcontractComponent } from './chartcontract.component';
import { ChartcontractService } from './chartcontract.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: ChartcontractComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  providers: [ChartcontractService],
  declarations: [ChartcontractComponent]
})
export class ChartcontractModule { }
