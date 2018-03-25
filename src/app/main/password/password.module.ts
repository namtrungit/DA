import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PasswordComponent } from './password.component';
import { PasswordService } from './password.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
const _routes: Routes = [
  { path: '', component: PasswordComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(_routes),
    FormsModule,
    HttpModule
  ],
  providers: [PasswordService],
  declarations: [PasswordComponent]
})
export class PasswordModule { }
