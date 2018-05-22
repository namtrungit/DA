import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SturuleComponent } from './sturule.component';
import { SturuleService } from './sturule.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: SturuleComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  providers: [SturuleService],
  declarations: [SturuleComponent]
})
export class SturuleModule { }
