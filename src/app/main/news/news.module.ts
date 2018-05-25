import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsService } from './news.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  {
    path: '', component: NewsComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'add', loadChildren: './addnews/addnews.module#AddnewsModule' },
      { path: 'list', loadChildren: './listnews/listnews.module#ListnewsModule' },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [NewsService],
  declarations: [NewsComponent]
})
export class NewsModule { }
