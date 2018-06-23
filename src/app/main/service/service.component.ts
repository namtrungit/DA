import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  public list_service: Array<any> = [];
  // del, update modal
  public service_id = '';
  public service_name = '';
  public service_price = '';
  public service_unit = '';
  public service_content = '';
  // create modal
  public cre_service_name = '';
  public cre_service_price = '';
  public cre_service_unit = '';
  public cre_service_content = '';
  constructor(
    private _serviceService: ServiceService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getService();
  }
  getService() {
    this._serviceService.getService().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._serviceService.tokenError();
        return;
      }
      if (res.status === 'success') {
        this.list_service = res.Services;
        console.log(this.list_service);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  clearCreateService() {
    this.cre_service_name = '';
    this.cre_service_price = '';
    this.cre_service_content = '';
    this.cre_service_unit = '';
  }
  addService() {
    if (this.cre_service_name === '') {
      toastr.warning('Bạn chưa nhập tên dịch vụ', 'Thông báo');
      $('#cre-service-name').focus();
      return;
    }
    if (this.cre_service_price === '') {
      toastr.warning('Bạn chưa nhập giá dịch vụ', 'Thông báo');
      $('#cre-service-price').focus();
      return;
    }
    if (this.cre_service_unit === '') {
      toastr.warning('Bạn chưa nhập đơn vị cho dịch vụ', 'Thông báo');
      $('#cre-service-unit').focus();
      return;
    }
    if (this.cre_service_content === '') {
      toastr.warning('Bạn chưa nhập mô tả dịch vụ', 'Thông báo');
      $('#cre-service-content').focus();
      return;
    }
    const service = JSON.stringify({
      service_name: this.cre_service_name,
      service_price: this.cre_service_price,
      service_unit: this.cre_service_unit,
      service_content: this.cre_service_content
    });
    // console.log(service);
    // return;
    this._serviceService.addService(service).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._serviceService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#createModal').modal('toggle');
        this.getService();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectService(service) {
    this.service_id = service.service_id;
    this.service_name = service.service_name;
    this.service_price = service.service_price;
    this.service_unit = service.service_unit;
    this.service_content = service.service_content;
    // console.log(service);
  }
  updateService() {
    if (this.service_name === '') {
      toastr.warning('Bạn chưa nhập tên dịch vụ', 'Thông báo');
      $('#service-name').focus();
      return;
    }
    if (this.service_price === '') {
      toastr.warning('Bạn chưa nhập giá dịch vụ', 'Thông báo');
      $('#service-price').focus();
      return;
    }
    if (this.service_unit === '') {
      toastr.warning('Bạn chưa nhập đơn vị', 'Thông báo');
      $('#service-unit').focus();
      return;
    }
    if (this.service_content === '') {
      toastr.warning('Bạn chưa nhập mô tả dịch vụ', 'Thông báo');
      $('#service-content').focus();
      return;
    }
    const service = JSON.stringify({
      service_id: this.service_id,
      service_name: this.service_name,
      service_price: this.service_price,
      service_unit: this.service_unit,
      service_content: this.service_content,
    });
    this._serviceService.updateService(service).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._serviceService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#updateModal').modal('toggle');
        this.getService();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  delService() {
    this._serviceService.delService(this.service_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._serviceService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getService();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
