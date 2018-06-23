import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { HomeComponent } from './home.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const _routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', loadChildren: './stuindex/stuindex.module#StuindexModule' },
      { path: 'register', loadChildren: './sturegister/sturegister.module#SturegisterModule' },
      { path: 'contact', loadChildren: './stucontact/stucontact.module#StucontactModule' },
      { path: 'recontract', loadChildren: './sturecontract/sturecontract.module#SturecontractModule' },
      { path: 'rule', loadChildren: './sturule/sturule.module#SturuleModule' },
      { path: 'detail/:id', loadChildren: './detail/detail.module#DetailModule' },
      { path: 'stayprice', loadChildren: './stayprice/stayprice.module#StaypriceModule' },
      { path: 'outin', loadChildren: './outin/outin.module#OutinModule' },
      { path: 'listservice', loadChildren: './listservice/listservice.module#ListserviceModule' },
      { path: 'bus', loadChildren: './bus/bus.module#BusModule' },
      { path: 'review', loadChildren: './review/review.module#ReviewModule' },
      { path: 'newscategories', loadChildren: './newscategories/newscategories.module#NewscategoriesModule' },
      { path: 'elec', loadChildren: './elec/elec.module#ElecModule' },
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
  providers: [HomeService],
  declarations: [HomeComponent]
})
export class HomeModule { }
