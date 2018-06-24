import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartserviceComponent } from './chartservice.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChartserviceService } from './chartservice.service';
import { FusionChartsModule } from 'angular4-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import * as OceanThem from 'fusioncharts/themes/fusioncharts.theme.ocean';
const _routes: Routes = [
  { path: '', component: ChartserviceComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(_routes),
    FusionChartsModule.forRoot(FusionCharts, Charts, FintTheme, OceanThem)
  ],
  providers: [ChartserviceService],
  declarations: [ChartserviceComponent]
})
export class ChartserviceModule { }
