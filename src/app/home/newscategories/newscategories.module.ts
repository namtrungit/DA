import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewscategoriesComponent } from './newscategories.component';
import { NewscategoriesService } from './newscategories.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
const _routes: Routes = [
  { path: '', component: NewscategoriesComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes),
    NgxPaginationModule
  ],
  providers: [NewscategoriesService],
  declarations: [NewscategoriesComponent]
})
export class NewscategoriesModule { }
