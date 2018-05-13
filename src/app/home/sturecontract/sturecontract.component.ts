import { Component, OnInit } from '@angular/core';
import { SturecontractService } from './sturecontract.service';
import { Router } from '@angular/router';
declare var toastr: any;
@Component({
  selector: 'app-sturecontract',
  templateUrl: './sturecontract.component.html',
  styleUrls: ['./sturecontract.component.css']
})
export class SturecontractComponent implements OnInit {
  public list_rec: Array<any> = [];
  constructor(
    private _sturecontractService: SturecontractService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRec();
  }
  getRec() {
    this._sturecontractService.getRec().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (res.status === 'success') {
        this.list_rec = res.list;
        console.log(this.list_rec);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
