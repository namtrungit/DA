import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractregComponent } from './contractreg.component';
import { ContractregService } from './contractreg.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  {path: '', component: ContractregComponent}
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [ContractregService],
  declarations: [ContractregComponent]
})
export class ContractregModule { }
