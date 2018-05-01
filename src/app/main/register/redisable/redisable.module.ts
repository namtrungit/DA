import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedisableComponent } from './redisable.component';
import { RedisableService } from './redisable.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: RedisableComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  providers: [RedisableService],
  declarations: [RedisableComponent]
})
export class RedisableModule { }
