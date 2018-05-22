import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleComponent } from './rule.component';
import { RuleService } from './rule.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: RuleComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(_routes)
  ],
  providers: [RuleService],
  declarations: [RuleComponent]
})
export class RuleModule { }
