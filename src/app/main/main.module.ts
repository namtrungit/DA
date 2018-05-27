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
      { path: 'password', loadChildren: './password/password.module#PasswordModule' },
      { path: 'faculty', loadChildren: './faculty/faculty.module#FacultyModule' },
      { path: 'student', loadChildren: './student/student.module#StudentModule' },
      { path: 'area', loadChildren: './area/area.module#AreaModule' },
      { path: 'room', loadChildren: './room/room.module#RoomModule' },
      { path: 'class', loadChildren: './class/class.module#ClassModule' },
      { path: 'contractreg', loadChildren: './contractreg/contractreg.module#ContractregModule' },
      { path: 'contract', loadChildren: './contract/contract.module#ContractModule' },
      { path: 'register', loadChildren: './register/register.module#RegisterModule' },
      { path: 'service', loadChildren: './service/service.module#ServiceModule' },
      { path: 'bill', loadChildren: './bill/bill.module#BillModule' },
      { path: 'chart', loadChildren: './chart/chart.module#ChartModule' },
      { path: 'rule', loadChildren: './rule/rule.module#RuleModule' },
      { path: 'addelec', loadChildren: './addelec/addelec.module#AddelecModule' },
      { path: 'enelec', loadChildren: './enelec/enelec.module#EnelecModule' },
      { path: 'diselec', loadChildren: './diselec/diselec.module#DiselecModule' },
      { path: 'news', loadChildren: './news/news.module#NewsModule' },
      { path: 'oldcontract', loadChildren: './oldcontract/oldcontract.module#OldcontractModule' },
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
