import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PriceService } from './price.service';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  public list_area: Array<any> = [];
  public list_floor: Array<any> = [];
  public list_adfById: Array<any> = [];
  public area_id = '';
  // select del/update modal
  public afd_id = '';
  public afd_floor_id = '';
  public afd_area_id = '';
  public afd_price = '';
  constructor(
    private _router: Router,
    private _priceService: PriceService
  ) { }

  ngOnInit() {
    this.getArea();
    this.getFloor();
  }
  selectAreaDetail(area) {
    this.area_id = area.area_id;
    this.getAreaById(area.area_id);
  }
  getAreaById(area_id) {
    this._priceService.getAfdById(area_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._priceService.tokenError();
        return;
      }
      if (res.status === 'success') {
        this.list_adfById = res.list_afd;
        console.log(this.list_adfById);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getArea() {
    this._priceService.getArea().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._priceService.tokenError();
        return;
      }
      if (res.status === 'success') {
        this.list_area = res.Areas;
        // console.log(this.list_area);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getFloor() {
    this._priceService.getFloor().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._priceService.tokenError();
        return;
      }
      if (res.status === 'success') {
        this.list_floor = res.Floors;
        // console.log(this.list_floor);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectAfd(afd) {
    this.afd_id = afd.af_id;
    this.afd_floor_id = afd.floor_id;
    this.afd_area_id = this.area_id;
    this.afd_price = afd.af_price;
    // console.log(afd);
  }
  updateAfd() {
    if (this.afd_area_id === '') {
      toastr.warning('Bạn chưa chọn khu', 'Thông báo');
      $('#afd-area-id').focus();
      return;
    }
    if (this.afd_floor_id === '') {
      toastr.warning('Bạn chưa chọn dãy', 'Thông báo');
      $('#afd-floor-id').focus();
      return;
    }
    if (this.afd_price === null) {
      toastr.warning('Bạn chưa nhập giá', 'Thông báo');
      $('#afd-price').focus();
      return;
    }
    const afd = JSON.stringify({
      af_id: this.afd_id,
      af_area_id: this.afd_area_id,
      af_floor_id: this.afd_floor_id,
      af_price: this.afd_price
    });
    // return console.log(afd);
    this._priceService.updateAfd(afd).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._priceService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#updateModal').modal('toggle');
        this.getAreaById(this.area_id);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  delAfd() {
    this._priceService.delAfd(this.afd_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._priceService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getAreaById(this.area_id);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
