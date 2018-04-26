import { Component, OnInit } from '@angular/core';
import { AreaService } from './area.service';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  public list_area: Array<any> = [];
  public list_floor: Array<any> = [];
  public list_adfById: Array<any> = [];
  // create
  public area_id = '';
  public area_sympol = '';
  public area_address = '';
  public area_sex = undefined;


  // select modal update delete
  public sl_area_id = '';
  public sl_area_sympol = '';
  public sl_area_address = '';
  public sl_area_sex = undefined;

  // select modal price
  public price_area_id = '';
  public price_floor_id = '';
  public price_value = '';
  public price_area_symbol = '';

  // del afd
  public af_id = '';

  constructor(
    private _areaService: AreaService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getArea();
    this.getFloor();
  }
  getArea() {
    this._areaService.getArea().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._areaService.tokenError();
        return;
      }
      if (res.status === 'success') {
        this.list_area = res.Areas;
        console.log(this.list_area);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getFloor() {
    this._areaService.getFloor().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._areaService.tokenError();
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
  delArea(area_id) {
    // console.log(area_id);
    this._areaService.delArea(this.sl_area_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._areaService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getArea();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectArea(area) {
    this.sl_area_id = area.area_id;
    this.sl_area_address = area.area_address;
    this.sl_area_sympol = area.area_sympol;
    this.sl_area_sex = area.area_sex;
    // console.log(area);
  }
  selectPriceArea(area) {
    this.price_area_symbol = area.area_sympol;
    this.price_area_id = area.area_id;
    this.getAreaById(area.area_id);
    console.log(this.price_area_id);
  }
  delAfd(afd) {
    this.af_id = afd.af_id;
    // console.log(afd);
    this._areaService.delAfd(this.af_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._areaService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getAreaById(this.price_area_id);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  clearArea() {
    this.sl_area_id = '';
    this.sl_area_address = '';
    this.sl_area_sympol = '';
    this.sl_area_sex = undefined;
  }
  updateArea() {
    if (this.sl_area_address === '') {
      toastr.warning('Bạn chưa nhập địa chỉ cho khu vực', 'Thông báo');
      $('#sl-area-address').focus();
      return;
    }
    if (this.sl_area_sympol === '') {
      toastr.warning('Bạn chưa nhập ký tự khu', 'Thông báo');
      $('#sl-area-sympol').focus();
      return;
    }
    if (this.sl_area_sex === 'undefined') {
      toastr.warning('Bạn chưa chọn giới tính cho khu vực', 'Thông báo');
      $('#sl-area-sex').focus();
      return;
    }
    const area = JSON.stringify({
      area_id: this.sl_area_id,
      area_address: this.sl_area_address,
      area_sympol: this.sl_area_sympol,
      area_sex: this.sl_area_sex
    });
    // console.log(this.sl_area_sex);
    this._areaService.updateArea(area).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._areaService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.sl_area_sympol = '';
        this.sl_area_address = '';
        this.sl_area_sex = undefined;
        $('#updateModal').modal('toggle');
        this.getArea();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  addArea() {
    if (this.area_address === '') {
      toastr.warning('Bạn chưa nhập địa chỉ cho khu vực', 'Thông báo');
      $('#area-address').focus();
      return;
    }
    if (this.area_sympol === '') {
      toastr.warning('Bạn chưa nhập ký tự khu', 'Thông báo');
      $('#area-sympol').focus();
      return;
    }
    if (this.area_sex === undefined) {
      toastr.warning('Bạn chưa chọn giới tính cho khu vực', 'Thông báo');
      $('#area-sex').focus();
      return;
    }
    const area = JSON.stringify({
      area_sympol: this.area_sympol,
      area_address: this.area_address,
      area_sex: this.area_sex
    });
    // console.log(area);
    this._areaService.addArea(area).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._areaService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.area_sympol = '';
        this.area_address = '';
        this.area_sex = undefined;
        this.getArea();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getAreaById(area_id) {
    this._areaService.getAfdById(area_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._areaService.tokenError();
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
  addAfd() {
    if (this.price_area_id === '') {
      toastr.warning('Bạn chưa chọn khu', 'Thông báo');
      $('#price-area-id').focus();
      return;
    }
    if (this.price_floor_id === '') {
      toastr.warning('Bạn chưa chọn dãy', 'Thông báo');
      $('#price-floor-id').focus();
      return;
    }
    if (this.price_value === '') {
      toastr.warning('Bạn chưa nhập giá', 'Thông báo');
      $('#price-value').focus();
      return;
    }
    const afd = JSON.stringify({
      af_area_id: this.price_area_id,
      af_floor_id: this.price_floor_id,
      af_price: this.price_value
    });
    // console.log(afd);
    this._areaService.addAfd(afd).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._areaService.tokenError();
        return;
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getAreaById(this.price_area_id);
        this.price_floor_id = '';
        this.price_value = '';
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
