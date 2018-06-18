import { Component, OnInit } from '@angular/core';
import { DiselecService } from './diselec.service';
import { Router } from '@angular/router';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-diselec',
  templateUrl: './diselec.component.html',
  styleUrls: ['./diselec.component.css']
})
export class DiselecComponent implements OnInit {
  public p = 1;
  public list_elec: Array<any> = [];
  public list_room: Array<any> = [];
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
    private _diselecService: DiselecService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getElec();
    this.getRoom();
  }
  getRoom() {
    this._diselecService.getRoom().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._diselecService.tokenError();
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
    this._diselecService.getElec().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._diselecService.tokenError();
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
  findElec() {
    const month = JSON.stringify({
      month: this.month_year,
      elec_id: this.search_elec_id,
      elec_room: this.search_elec_room
    });
    // console.log(month);
    // return;
    this._diselecService.findElec(month).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        // console.log(res);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._diselecService.tokenError();
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
  checkEnable() {
    const elec = JSON.stringify({
      elec_id: this.elec_id
    });
    // console.log(elec);
    this._diselecService.checkEnable(elec).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._diselecService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#reModal').modal('toggle');
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
    this._diselecService.delElec(this.elec_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._diselecService.tokenError();
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
