import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MainService } from './main.service';
const _routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      // localhost:4200/main/index
      { path: 'index', loadChildren: './index/index.module#IndexModule' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
      { path: 'password', loadChildren: './password/password.module#PasswordModule'}
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  providers: [MainService],
  declarations: [MainComponent]
})
export class MainModule { }
