import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
const _routes: Routes = [
  {
    path: '', component: RegisterComponent, children: [
      {path: '', redirectTo: 'enable', pathMatch: 'full' },
      { path: 'disable', loadChildren: './redisable/redisable.module#RedisableModule' },
      { path: 'enable', loadChildren: './reenable/reenable.module#ReenableModule' },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(_routes),
    FormsModule
  ],
  providers: [RegisterService],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
