import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnelecService } from './enelec.service';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-enelec',
  templateUrl: './enelec.component.html',
  styleUrls: ['./enelec.component.css']
})
export class EnelecComponent implements OnInit {
  public p = 1;
  public list_elec: Array<any> = [];
  public list_room: Array<any> = [];
  public user_position = '';
  // modal search
  public month_year = '';
  public search_elec_id = '';
  public search_elec_room = '';

  // del và updatemodal
  public elec_id = '';
  public elec_room = '';
  public elec_month = '';
  public elec_amount = '';
  public elec_total = '';
  public elec_creater = '';
  public elec_status = '';
  public createdAt = '';
  constructor(
    private _router: Router,
    private _enelecService: EnelecService
  ) { }

  ngOnInit() {
    this.getElec();
    this.getRoom();
    this.getProfile();
  }
  getProfile() {
    this._enelecService.getProfile().subscribe(res => {
      if (res.status === 'error') {
        if (!res.isAuth) {
          this._enelecService.tokenError();
        }
        toastr.error(res.message);
      } else if (res.status === 'success') {
        this.user_position = res.user.user_positon;
        // console.log(this.user_position);
      }
    }, error => {
      console.log('Không thể truy cập đến server');
      this._router.navigate(['error']);
    });
  }
  getRoom() {
    this._enelecService.getRoom().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._enelecService.tokenError();
        return;
      }
      if (res.status === 'success') {
        this.list_room = res.Rooms;
        // console.log(res.list);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getElec() {
    this._enelecService.getElec().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._enelecService.tokenError();
        return;
      }
      if (res.status === 'success') {
        this.list_elec = res.list;
        // console.log(res.list);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  clearSearch() {
    this.month_year = '';
    this.search_elec_id = '';
    this.search_elec_room = '';
  }
  findElec() {
    const month = JSON.stringify({
      month: this.month_year,
      elec_id: this.search_elec_id,
      elec_room: this.search_elec_room
    });
    // console.log(month);
    // return;
    this._enelecService.findElec(month).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        // console.log(res);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._enelecService.tokenError();
        return;
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        // toastr.success(res.message);
        this.list_elec = res.list;
        $('#searchModal').modal('toggle');
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectElec(elec) {
    this.elec_id = elec.elec_id;
    this.elec_room = elec.elec_room;
    this.elec_month = elec.elec_month;
    this.elec_amount = elec.elec_amount;
    this.elec_total = elec.elec_total;
    this.elec_creater = elec.elec_creater;
    this.elec_status = elec.elec_status;
    this.createdAt = elec.createdAt;
    // console.log(elec);
  }
  updateElec() {
    if (this.elec_amount === '' || this.elec_amount === null) {
      toastr.warning('Bạn chưa nhập số lượng điện', 'Thông báo');
      $('#elec-amount').focus();
      return;
    }
    if (this.elec_total === '' || this.elec_total === null) {
      toastr.warning('Bạn chưa nhập tổng tiền cho phiếu điện', 'Thông báo');
      $('#elec-total').focus();
      return;
    }
    const elec = JSON.stringify({
      elec_id: this.elec_id,
      elec_amount: this.elec_amount,
      elec_total: this.elec_total
    });
    // console.log(elec);
    this._enelecService.updateElec(elec).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._enelecService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#updateModal').modal('toggle');
        this.getElec();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  checkDisable() {
    const elec = JSON.stringify({
      elec_id: this.elec_id
    });
    // console.log(elec);
    this._enelecService.checkDisable(elec).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._enelecService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#detailModal').modal('toggle');
        this.getElec();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  delElec() {
    this._enelecService.delElec(this.elec_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._enelecService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getElec();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
