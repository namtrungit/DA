import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnelecComponent } from './enelec.component';
import { EnelecService } from './enelec.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
const _routes: Routes = [
  { path: '', component: EnelecComponent}
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes),
    NgxPaginationModule
  ],
  providers: [EnelecService],
  declarations: [EnelecComponent]
})
export class EnelecModule { }
