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
  public service_content = '';
  public service_status = '';
  // create modal
  public cre_service_name = '';
  public cre_service_price = '';
  public cre_service_content = '';
  constructor(
    private _serviceService: ServiceService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getService();
    $('#cre-service-date').datetimepicker({
      format: 'DD/MM/YYYY'
    });
    $('#service-date').datetimepicker({
      format: 'DD/MM/YYYY'
    });
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
    $('#cre-service-date').val(null);
    this.cre_service_content = '';
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
    if ($('#cre-service-date').val() === '') {
      toastr.warning('Bạn chưa chọn ngày áp dụng dịch vụ', 'Thông báo');
      $('#cre-service-date').focus();
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
      service_date: $('#cre-service-date').val(),
      service_content: this.cre_service_content
    });
    // console.log(service);
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
    $('#service-date').val(service.service_date);
    this.service_content = service.service_content;
    this.service_status = service.service_status;
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
    if ($('#service-date').val() === '') {
      toastr.warning('Bạn chưa chọn ngày áp dụng dịch vụ', 'Thông báo');
      $('#service-date').focus();
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
      service_date: $('#service-date').val(),
      service_content: this.service_content,
      service_status: this.service_status
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