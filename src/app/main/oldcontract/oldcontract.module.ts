import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OldcontractComponent } from './oldcontract.component';
import { OldcontractService } from './oldcontract.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: OldcontractComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  providers: [OldcontractService],
  declarations: [OldcontractComponent]
})
export class OldcontractModule { }
