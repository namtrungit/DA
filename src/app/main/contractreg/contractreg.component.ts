import { Component, OnInit } from '@angular/core';
import { ContractregService } from './contractreg.service';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-contractreg',
  templateUrl: './contractreg.component.html',
  styleUrls: ['./contractreg.component.css']
})
export class ContractregComponent implements OnInit {
  public list_rec: Array<any> = [];
  public recontract_id = '';
  public recontract_name = '';
  public recontract_content = '';
  public recontract_status = '';
  public recontract_promotion = '';
  public recontract_limit = '';

  // create modal
  public cre_recontract_name = '';
  public cre_recontract_content = '';
  public cre_recontract_promotion = '';
  public cre_recontract_limit = '';
  constructor(
    private _contractReg: ContractregService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRec();
    $('#cre-recontract-date').datetimepicker({
      format: 'DD/MM/YYYY'
    });
    $('#recontract-date').datetimepicker({
      format: 'DD/MM/YYYY'
    });
  }
  selectRec(recontract) {
    this.recontract_id = recontract.recontract_id;
    this.recontract_name = recontract.recontract_name;
    this.recontract_content = recontract.recontract_content;
    $('#recontract-date').val(recontract.recontract_date);
    this.recontract_status = recontract.recontract_status;
    this.recontract_promotion = recontract.recontract_promotion;
    this.recontract_limit = recontract.recontract_limit;
    console.log(recontract);
  }
  clearCreateRec() {
    this.cre_recontract_name = '';
    this.cre_recontract_content = '';
    $('#cre-recontract-date').val(null);
    this.cre_recontract_promotion = '';
    this.cre_recontract_limit = '';
  }
  getRec() {
    this._contractReg.getRec().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractReg.tokenError();
      }
      if (res.status === 'success') {
        this.list_rec = res.list;
        console.log(this.list_rec);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  addRec() {
    if (this.cre_recontract_name === '') {
      toastr.warning('Bạn chưa nhập tên quy định', 'Thông báo');
      $('#cre-recontract-name').focus();
      return;
    }
    if ($('#cre-recontract-date').val() === '') {
      toastr.warning('Bạn chưa chọn ngày ban hành', 'Thông báo');
      $('#cre-recontract-date').focus();
      return;
    }
    if (this.cre_recontract_promotion === '') {
      toastr.warning('Bạn chưa nhập khuyến mãi', 'Thông báo');
      $('#cre-recontract-promotion').focus();
      return;
    }
    if (this.cre_recontract_limit === '') {
      toastr.warning('Bạn chưa nhập thời hạn hợp đồng', 'Thông báo');
      $('#cre-recontract-limit').focus();
      return;
    }
    if (this.cre_recontract_content === '') {
      toastr.warning('Bạn chưa nhập nội dung quy định', 'Thông báo');
      $('#cre-recontract-content').focus();
      return;
    }
    const recontract = JSON.stringify({
      // rec_value: $('#cre-recontract-content').val()
      recontract_name: this.cre_recontract_name,
      recontract_date: $('#cre-recontract-date').val(),
      recontract_content: this.cre_recontract_content,
      recontract_promotion: this.cre_recontract_promotion,
      recontract_limit: this.cre_recontract_limit
    });
    console.log(recontract);
    // return;
    this._contractReg.addRec(recontract).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractReg.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#createModal').modal('toggle');
        this.getRec();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  delRec() {
    this._contractReg.delRec(this.recontract_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractReg.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#delModal').modal('toggle');
        this.getRec();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  updateRec() {
    if (this.recontract_name === '') {
      toastr.warning('Bạn chưa nhập tên quy định', 'Thông báo');
      $('#recontract-name').focus();
      return;
    }
    if ($('#recontract-date').val() === '') {
      toastr.warning('Bạn chưa chọn ngày ban hành', 'Thông báo');
      $('#recontract-date').focus();
      return;
    }
    if (this.recontract_promotion === null) {
      toastr.warning('Bạn chưa nhập khuyến mãi', 'Thông báo');
      $('#recontract-promotion').focus();
      return;
    }
    if (this.recontract_limit === null) {
      toastr.warning('Bạn chưa nhập thời hạn hợp đồng', 'Thông báo');
      $('#recontract-limit').focus();
      return;
    }
    if (this.recontract_content === '') {
      toastr.warning('Bạn chưa nhập nội dung quy định', 'Thông báo');
      $('#recontract-content').focus();
      return;
    }
    const recontract = JSON.stringify({
      recontract_id: this.recontract_id,
      recontract_name: this.recontract_name,
      recontract_date: $('#recontract-date').val(),
      recontract_content: this.recontract_content,
      recontract_status: this.recontract_status,
      recontract_promotion: this.recontract_promotion,
      recontract_limit: this.recontract_limit
    });
    this._contractReg.updateRec(recontract).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractReg.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#updateModal').modal('toggle');
        this.getRec();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
