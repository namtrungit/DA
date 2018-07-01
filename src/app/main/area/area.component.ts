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
  // create
  public area_id = '';
  public area_sympol = '';
  public area_address = '';


  // select modal update delete
  public sl_area_id = '';
  public sl_area_sympol = '';
  public sl_area_address = '';
  public update_area_sympol = '';
  constructor(
    private _areaService: AreaService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getArea();
  }
  clearUpdate() {
    this.update_area_sympol = '';
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
      if (res.status === 'warning') {
        toastr.warning(res.message);
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
    // console.log(area);
  }
  clearArea() {
    this.sl_area_id = '';
    this.sl_area_address = '';
    this.sl_area_sympol = '';
  }
  updateArea() {
    if (this.sl_area_address === '') {
      toastr.warning('Bạn chưa nhập địa chỉ cho khu vực', 'Thông báo');
      $('#sl-area-address').focus();
      return;
    }
    const area = JSON.stringify({
      area_id: this.sl_area_id,
      area_address: this.sl_area_address,
      update_area_sympol: this.update_area_sympol,
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
    const area = JSON.stringify({
      area_sympol: this.area_sympol,
      area_address: this.area_address,
    });
    // console.log(area);
    // return;
    this._areaService.addArea(area).subscribe(res => {
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
        $('#area-sympol').focus();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.area_sympol = '';
        this.area_address = '';
        this.getArea();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
