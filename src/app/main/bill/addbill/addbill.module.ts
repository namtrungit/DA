import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddbillComponent } from './addbill.component';
import { AddbillService } from './addbill.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  {path: '', component: AddbillComponent}
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  providers: [AddbillService],
  declarations: [AddbillComponent]
})
export class AddbillModule { }
