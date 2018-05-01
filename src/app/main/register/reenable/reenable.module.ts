import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReenableComponent } from './reenable.component';
import { ReenableService } from './reenable.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: ReenableComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [ReenableService],
  declarations: [ReenableComponent]
})
export class ReenableModule { }