import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutinComponent } from './outin.component';
import { OutinService } from './outin.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: OutinComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [OutinService],
  declarations: [OutinComponent]
})
export class OutinModule { }
