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
  public list_bs: Array<any> = [];
  // Bill
  public bill_id = '';
  // Details modal
  public de_bill_id = '';
  public de_bill_stu_id = '';
  public de_stu_name = '';
  public de_bill_createdAt = '';
  public de_bill_create = '';
  public de_bill_total = '';
  public de_bill_stu_name = '';

  // Search modal
  public search_bill_id = '';
  public search_stu_id = '';
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
        // console.log(this.list_bill);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getBs() {
    const bs = JSON.stringify({
      bs_bill_id: this.de_bill_id
    });
    this._listbillService.getBs(bs).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listbillService.tokenError();
      }
      if (res.status === 'success') {
        this.list_bs = res.list_bs;
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectBill(bill) {
    this.bill_id = bill.bill_id;
    this.de_bill_id = bill.bill_id;
    this.de_bill_stu_id = bill.bill_stu_id;
    this.de_bill_stu_name = bill.stu_name;
    this.de_bill_createdAt = bill.bill_createAt;
    this.de_bill_create = bill.bill_create_name;
    this.de_bill_total = bill.bill_total;
    this.getBs();
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
  clearSearch() {
    this.search_bill_id = '';
    this.search_stu_id = '';
  }
  findBill() {
    const bill = JSON.stringify({
      bill_id: this.search_bill_id,
      bill_stu_id: this.search_stu_id
    });
    // console.log(bill);
    this._listbillService.findBill(bill).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listbillService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        this.list_bill = res.list;
        $('#searchModal').modal('toggle');
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
