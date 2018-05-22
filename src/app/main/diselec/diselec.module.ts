import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiselecComponent } from './diselec.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DiselecService } from './diselec.service';
const _routes: Routes = [
  {path: '', component: DiselecComponent}
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [DiselecService],
  declarations: [DiselecComponent]
})
export class DiselecModule { }
