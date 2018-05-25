import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddnewsComponent } from './addnews.component';
import { AddnewsService } from './addnews.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: AddnewsComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [AddnewsService],
  declarations: [AddnewsComponent]
})
export class AddnewsModule { }
