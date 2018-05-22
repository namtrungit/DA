import { Component, OnInit } from '@angular/core';
import { AddelecService } from './addelec.service';
import { Router } from '@angular/router';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-addelec',
  templateUrl: './addelec.component.html',
  styleUrls: ['./addelec.component.css']
})
export class AddelecComponent implements OnInit {
  public list_room: Array<any> = [];
  public elec_creater = '';
  public elec_id = '';
  public elec_room = '';
  public elec_month = '';
  public elec_amount = '';
  public elec_total = '';
  constructor(
    private _addelecService: AddelecService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRoom();
    this.getCreater();
  }
  getRoom() {
    this._addelecService.getRoom().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addelecService.tokenError();
      }
      if (res.status === 'success') {
        this.list_room = res.Rooms;
        console.log(this.list_room);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getCreater() {
    this._addelecService.getCreater().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addelecService.tokenError();
      }
      if (res.status === 'success') {
        this.elec_creater = res.user.user_name;
        // console.log(this.elec_creater);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  createId(): string {
    const date = new Date();
    const random = 'EB' + Math.random().toString(30).slice(2);
    const nam = date.getFullYear().toString(),
      thang = date.getMonth().toString(),
      ngay = date.getDate().toString(),
      gio = date.getHours().toString(),
      phut = date.getMinutes().toString(),
      giay = date.getSeconds().toString(),
      nam1 = nam.substring(2);
    this.elec_id = 'EB' + nam1.concat(thang, ngay, gio, random.substring(9));
    // console.log(this.idBill);
    return;
  }
  addElec() {
    if (this.elec_room === '') {
      toastr.warning('Bạn chưa nhập phòng', 'Thông báo');
      $('#elec-room').focus();
      return;
    }
    if (this.elec_month === '') {
      toastr.warning('Bạn chưa chọn kỳ cho phiếu', 'Thông báo');
      $('#elec-month').focus();
      return;
    }
    if (this.elec_amount === null || this.elec_amount === '') {
      toastr.warning('Bạn chưa nhập tổng số ký điện cho phiếu', 'Thông báo');
      $('#elec-amount').focus();
      return;
    }
    if (this.elec_total === null || this.elec_total === '') {
      toastr.warning('Bạn chưa nhập tổng tiền cho phiếu', 'Thông báo');
      $('#elec-total').focus();
      return;
    }
    if (this.elec_creater === '') {
      toastr.warning('Bạn chưa cập nhật tên cho tài khoản hãy cập nhật đề thực hiện chức năng này', 'Thông báo');
      return;
    }
    this.createId();
    const elec = JSON.stringify({
      elec_id: this.elec_id,
      elec_room: this.elec_room,
      elec_month: this.elec_month,
      elec_amount: this.elec_amount,
      elec_total: this.elec_total,
      elec_creater: this.elec_creater
    });
    // console.log(elec);
    this._addelecService.addElec(elec).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addelecService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.elec_id = '';
        this.elec_room = '';
        this.elec_month = '';
        this.elec_amount = '';
        this.elec_total = '';
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
