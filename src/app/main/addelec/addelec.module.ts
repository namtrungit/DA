import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddelecComponent } from './addelec.component';
import { AddelecService } from './addelec.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  { path: '', component: AddelecComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes)
  ],
  providers: [AddelecService],
  declarations: [AddelecComponent]
})
export class AddelecModule { }
