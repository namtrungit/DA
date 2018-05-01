import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SturegisterComponent } from './sturegister.component';
import { SturegisterService } from './sturegister.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: SturegisterComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  providers: [SturegisterService],
  declarations: [SturegisterComponent]
})
export class SturegisterModule { }
