import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SturecontractComponent } from './sturecontract.component';
import { SturecontractService } from './sturecontract.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: SturecontractComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  providers: [SturecontractService],
  declarations: [SturecontractComponent]
})
export class SturecontractModule { }
