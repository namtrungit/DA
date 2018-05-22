import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SturuleService } from './sturule.service';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-sturule',
  templateUrl: './sturule.component.html',
  styleUrls: ['./sturule.component.css']
})
export class SturuleComponent implements OnInit {
  public list_rule: Array<any> = [];
  constructor(
    private _router: Router,
    private _sturuleService: SturuleService
  ) { }

  ngOnInit() {
    this.getRule();
  }
  getRule() {
    this._sturuleService.getRule().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (res.status === 'success') {
        this.list_rule = res.Rules;
        console.log(this.list_rule);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
