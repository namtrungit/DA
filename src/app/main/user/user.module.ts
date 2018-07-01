import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
const _routes: Routes = [
  { path: '', component: UserComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(_routes),
    FormsModule
  ],
  providers: [UserService],
  declarations: [UserComponent]
})
export class UserModule { }
