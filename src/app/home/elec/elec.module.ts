import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElecComponent } from './elec.component';
import { ElecService } from './elec.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
const _routes: Routes = [
  { path: '', component: ElecComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes),
    NgxPaginationModule
  ],
  providers: [ElecService],
  declarations: [ElecComponent]
})
export class ElecModule { }