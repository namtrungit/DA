import { Component, OnInit } from '@angular/core';
import { ListbillService } from './listbill.service';
import { Router } from '@angular/router';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-listbill',
  templateUrl: './listbill.component.html',
  styleUrls: ['./listbill.component.css']
})
export class ListbillComponent implements OnInit {
  public list_bill: Array<any> = [];
  // Bill
  public bill_id = '';
  constructor(
    private _listbillService: ListbillService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getBill();
  }
  getBill() {
    this._listbillService.getBill().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listbillService.tokenError();
      }
      if (res.status === 'success') {
        this.list_bill = res.Bills;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectBill(bill) {
    this.bill_id = bill.bill_id;
    // console.log(this.bill_id);
  }
  delBill() {
    this._listbillService.delBill(this.bill_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listbillService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getBill();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
