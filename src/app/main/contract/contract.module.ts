import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponent } from './contract.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ContractService } from './contract.service';
const _routes: Routes = [
  { path: '', component: ContractComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [ContractService],
  declarations: [ContractComponent]
})
export class ContractModule { }