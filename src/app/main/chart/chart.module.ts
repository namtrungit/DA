import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { ChartService } from './chart.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  {
    path: '', component: ChartComponent, children: [
      { path: '', redirectTo: 'contract', pathMatch: 'full' },
      { path: 'contract', loadChildren: './chartcontract/chartcontract.module#ChartcontractModule' }
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
  providers: [ChartService],
  declarations: [ChartComponent]
})
export class ChartModule { }
