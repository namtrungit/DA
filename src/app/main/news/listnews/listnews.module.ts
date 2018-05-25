import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListnewsComponent } from './listnews.component';
import { ListnewsService } from './listnews.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: ListnewsComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  providers: [ListnewsService],
  declarations: [ListnewsComponent]
})
export class ListnewsModule { }
