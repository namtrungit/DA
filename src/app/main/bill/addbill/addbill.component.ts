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
  public giohangs: Array<any> = [];
  public tongtien = 0;

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

  // Details modal
  public de_bill_id = '';
  public de_bill_stu_id = '';
  public de_stu_name = '';
  public de_bill_createdAt = '';
  public de_bill_create = '';
  public de_bill_total = '';
  public de_bill_stu_name = '';

  constructor(
    private _addBillService: AddbillService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getCreate();
    this.getListStuId();
    this.getService();
    sessionStorage.removeItem('giohang');
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
        console.log(this.list_service);
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
        sessionStorage.removeItem('giohang');
        this.thongtingio();
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
    // this.getBsById();
    console.log(bill);
    this.de_bill_id = bill.bill_id;
    this.de_bill_stu_id = bill.bill_stu_id;
    this.de_bill_stu_name = bill.stu_name;
    this.de_bill_createdAt = bill.bill_createAt;
    this.de_bill_create = bill.bill_create_name;
    this.de_bill_total = bill.bill_total;
    const lstService = sessionStorage.getItem('giohang');
    this.list_bs = JSON.parse(lstService);
    console.log(this.list_bs);
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


  // Test
  Pay() {
    this.totalBill();
    const lstService = sessionStorage.getItem('giohang');
    console.log(lstService);
    if (lstService) {
      const sanpham = JSON.parse(lstService);
      for (let i = 0; i < sanpham.length; i++) {
        const bs = JSON.stringify({
          bs_bill_id: this.bill_id,
          bs_service_id: sanpham[i].bs_service_id,
          bs_service_price: sanpham[i].bs_service_price
        });
        console.log(bs);
        this._addBillService.addBs(bs).subscribe(res => {
          if (res.status === 'error') {
            toastr.error(res.message);
            return;
          }
          if (!res.isAuth && res.status === 'error') {
            return this._addBillService.tokenError();
          }
        }, error => {
          console.log('Không nết nối được tới máy chủ');
          this._router.navigate(['error']);
          return;
        });
      }
      sessionStorage.removeItem('giohang');
      this.thongtingio();
      this.bill_id = '';
      this.newBill();
      $('#addServiceModal').modal('toggle');
    }
  }
  totalBill() {
    if (this.bill_id === '') {
      toastr.warning('ID hóa đơn không hợp lệ', 'Thông báo');
      return;
    }
    if (this.tongtien === 0) {
      toastr.warning('Bạn chưa thêm bất kỳ dịch vụ nào cho hóa đơn', 'Thông báo');
      return;
    }
    const bill = JSON.stringify({
      bill_id: this.bill_id,
      bill_total: this.tongtien
    });
    // console.log(bill);
    this._addBillService.totalBill(bill).subscribe(res => {

      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addBillService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  addCart(service) {
    console.log(service);
    const obj = {
      bs_service_id: service['service_id'],
      bs_service_name: service['service_name'],
      bs_service_price: service['service_price'],
    };
    console.log(obj);
    const lstService = sessionStorage.getItem('giohang');
    console.log(lstService);
    if (lstService) {
      const sanpham = JSON.parse(lstService);
      let i;
      for (i = 0; i < sanpham.length; i++) {
        if (sanpham[i].bs_service_id === service['service_id']) {
          toastr.warning('Dịch vụ này đã có trong hóa đơn rồi', 'Thông báo');
          return;
        }
      }
      sanpham.push(obj);
      const myJsString = JSON.stringify(sanpham);
      console.log('chuoi mystring ' + myJsString);
      sessionStorage.setItem('giohang', myJsString);
      this.thongtingio();
    } else {
      const myJsString = JSON.stringify(obj);
      sessionStorage.setItem('giohang', '[' + myJsString + ']');
      this.thongtingio();
    }
  }
  thongtingio() {
    this.giohangs = this._addBillService.getContent();
    this.tongtien = this.gettotalMoney();
  }
  gettotalMoney(): number {
    const lstService = sessionStorage.getItem('giohang');
    if (lstService) {
      const sanpham = JSON.parse(lstService);
      let tongtien = 0;
      for (let i = 0; i < sanpham.length; i++) {
        tongtien += Number.parseInt(sanpham[i].bs_service_price);
      }
      return tongtien;
    } else {
      return 0;
    }
  }

  xoaItemgiohang(bs) {
    const obj = {
      bs_service_id: bs['bs_service_id']
    };
    // console.log(obj);
    const arrGiohangmoi = new Array();
    const lstService = sessionStorage.getItem('giohang');
    const sanpham = JSON.parse(lstService);
    console.log(lstService);
    if (lstService) {
      let j;
      for (j = 0; j < sanpham.length; j++) {
        if (sanpham[j].bs_service_id === obj['bs_service_id']) {
          sanpham.splice(j, 1);
          break;
        }
      }
    }
    const myJString = JSON.stringify(sanpham);
    sessionStorage.setItem('giohang', myJString);
    this.thongtingio();
    this.gettotalMoney();
  }
}
