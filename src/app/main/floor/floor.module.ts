import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorComponent } from './floor.component';
import { FloorService } from './floor.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: FloorComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [FloorService],
  declarations: [FloorComponent]
})
export class FloorModule { }
