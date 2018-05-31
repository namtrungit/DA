import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportService } from './report.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const _routes: Routes = [
  {
    path: '', component: ReportComponent, children: [
      { path: '', redirectTo: 'listreport', pathMatch: 'full' },
      { path: 'listreport', loadChildren: './listreport/listreport.module#ListreportModule' },
      { path: 'addreport', loadChildren: './addreport/addreport.module#AddreportModule' },
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
  providers: [ReportService],
  declarations: [ReportComponent]
})
export class ReportModule { }
