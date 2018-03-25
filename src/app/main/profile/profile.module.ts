import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileService } from './profile.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
const _routes: Routes = [
  { path: '', component: ProfileComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(_routes),
  ],
  providers: [ProfileService],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
