import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartcontractService } from './chartcontract.service';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-chartcontract',
  templateUrl: './chartcontract.component.html',
  styleUrls: ['./chartcontract.component.css']
})
export class ChartcontractComponent implements OnInit {
  public list_contract: Array<any> = [];
  public month_year = '';
  // modal detail contract
  public de_stu_name = '';
  public de_stu_id_school = '';
  public de_contract_id = '';
  public de_room_name = '';
  public de_recontract_name = '';
  public de_recontract_promotion = '';
  public de_recontract_limit = '';
  public de_contract_createdAt = '';
  public de_contract_date_get_room = '';
  public de_contract_date_end = '';
  public de_contract_create = '';
  public de_contract_price = 0;
  constructor(
    private _router: Router,
    private _chartContractService: ChartcontractService
  ) { }

  ngOnInit() {
  }
  clearSearch() {
    this.month_year = '';
  }
  chartContract() {
    if (this.month_year === '') {
      toastr.warning('Bạn chưa chọn tháng năm để tìm kiếm', 'Thông báo');
      $('#month-year').focus();
      return;
    }
    const month_year = JSON.stringify({
      month_year: this.month_year
    });
    // console.log(month_year);
    this._chartContractService.chartContract(month_year).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._chartContractService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success('Tìm thành công', 'Thông báo');
        this.list_contract = res.Contracts;
        $('#searchModal').modal('toggle');
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectDetailContract(contract) {
    this.de_stu_name = contract.stu_name;
    this.de_stu_id_school = contract.stu_id_school;
    this.de_contract_id = contract.contract_id;
    this.de_room_name = contract.room_name;
    this.de_recontract_name = contract.recontract_name;
    this.de_recontract_promotion = contract.recontract_promotion;
    this.de_recontract_limit = contract.recontract_limit;
    this.de_contract_createdAt = contract.contract_createdAt;
    this.de_contract_date_get_room = contract.contract_date_get_room;
    this.de_contract_date_end = contract.contract_date_end;
    this.de_contract_create = contract.contract_create;
    this.de_contract_price = (contract.af_price * contract.recontract_limit * (100 - contract.recontract_promotion)) / 100;
  }
}
