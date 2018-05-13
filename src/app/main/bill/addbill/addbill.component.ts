import { Component, OnInit } from '@angular/core';
import { AddbillService } from './addbill.service';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-addbill',
  templateUrl: './addbill.component.html',
  styleUrls: ['./addbill.component.css']
})
export class AddbillComponent implements OnInit {
  public list_bill: Array<any> = [];
  public list_service: Array<any> = [];
  public list_bs: Array<any> = [];

  public idBill = '';
  public bill_id = '';
  public bill_stu_id = '';
  public bill_create_name = '';
  // BillserviceDetails
  public bill_service_id = '';
  public bs_id;
  // autocomplete textbox
  public showDD = false;
  public list_id_stu: Array<any> = [];
  constructor(
    private _addBillService: AddbillService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getCreate();
    this.getListStuId();
    this.getService();
  }
  // Bs
  addBs() {
    if (this.bill_service_id === '') {
      toastr.warning('Bạn chưa chọn dịch vụ', 'Thông báo');
      $('#bill-service-id').focus();
      return;
    }
    const bs = JSON.stringify({
      bs_bill_id: this.bill_id,
      bs_service_id: this.bill_service_id
    });
    // console.log(bs);
    this._addBillService.addBs(bs).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addBillService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getBsById();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getBsById() {
    // console.log('đã vào');
    const bs = JSON.stringify({
      bs_bill_id: this.bill_id
    });
    this._addBillService.getBsById(bs).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addBillService.tokenError();
      }
      if (res.status === 'success') {
        this.list_bs = res.list_bs;
        // console.log(bs);
        // console.log(this.list_bs);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  delBs(bs) {
    this._addBillService.delBs(bs.bs_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addBillService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getBsById();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }


  //
  getCreate() {
    this._addBillService.getCreate().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addBillService.tokenError();
      }
      if (res.status === 'success') {
        this.bill_create_name = res.user.user_name;
        // console.log(this.bill_create_name);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getService() {
    this._addBillService.getService().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addBillService.tokenError();
      }
      if (res.status === 'success') {
        this.list_service = res.Services;
        // console.log(this.bill_create_name);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  clearCreate() {
    this.bill_stu_id = '';
    this.createIdBill();
    this.bill_id = this.idBill;
  }
  createIdBill(): string {
    const date = new Date();
    const random = 'id' + Math.random().toString(30).slice(2);
    const nam = date.getFullYear().toString(),
      thang = date.getMonth().toString(),
      ngay = date.getDate().toString(),
      gio = date.getHours().toString(),
      phut = date.getMinutes().toString(),
      giay = date.getSeconds().toString(),
      nam1 = nam.substring(2);
    this.idBill = 'B' + nam1.concat(thang, ngay, gio, random.substring(9));
    // console.log(this.idBill);
    return;
  }
  addBill() {
    if (this.bill_id === '') {
      toastr.warning('Bạn chưa nhập mã hóa đơn', 'Thông báo');
      $('#bill-id').focus();
      return;
    }
    if (this.bill_stu_id === '') {
      toastr.warning('Bạn chưa nhập mã sinh viên', 'Thông báo');
      $('#bill-stu-id').focus();
      return;
    }
    if (this.bill_create_name === '') {
      toastr.warning('Vui lòng cập nhật thông tin tài khoản để xác nhận người lập hóa đơn', 'Thông báo');
      return;
    }
    const bill = JSON.stringify({
      bill_id: this.bill_id,
      bill_stu_id: this.bill_stu_id,
      bill_create_name: this.bill_create_name
    });
    this._addBillService.addBill(bill).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addBillService.tokenError();
      }
      if (res.status === 'warning stu') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#createModal').modal('toggle');
        this.bill_id = res.bill.bill_id;
        this.newBill();
        // console.log(this.bill_id);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  newBill() {
    const bill = JSON.stringify({
      bill_id: this.bill_id
    });
    this._addBillService.newBill(bill).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addBillService.tokenError();
      }
      if (res.status === 'success') {
        this.list_bill = res.Bills;
        // console.log(this.list_bill);
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
    this.bill_service_id = '';
    this.getBsById();
    // console.log(this.bill_id);
  }
  delBill() {
    this._addBillService.dellBill(this.bill_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addBillService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.bill_id = '';
        this.newBill();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }

  // Autocomplete textbox stu_id
  toggleDropDown() {
    this.showDD = !this.showDD;
  }
  toggleOff() {
    this.showDD = false;
  }
  getListStuId() {
    this._addBillService.getListIdStu().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addBillService.tokenError();
      }
      if (res.status === 'success') {
        this.list_id_stu = res.list_id;
        console.log(this.list_id_stu);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectId(stu) {
    this.bill_stu_id = stu.stu_id_school;
  }
  getStuTap() {
    const stu = JSON.stringify({
      stu_id_school: this.bill_stu_id
    });
    // console.log(stu);
    this._addBillService.getListIdStuAuto(stu).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addBillService.tokenError();
      }
      if (res.status === 'success') {
        this.list_id_stu = res.id;
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
