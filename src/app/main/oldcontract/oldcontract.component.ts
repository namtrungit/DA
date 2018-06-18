import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OldcontractService } from './oldcontract.service';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-oldcontract',
  templateUrl: './oldcontract.component.html',
  styleUrls: ['./oldcontract.component.css']
})
export class OldcontractComponent implements OnInit {
  public p = 1;
  list_contract: Array<any> = [];
  // del and update modal
  public contract_id = '';
  public contract_id_stu_school = '';
  public contract_room_name = '';
  public contract_id_recontract = '';
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
  // modal search
  public search_contract_id = '';
  public search_stu_id = '';
  constructor(
    private _router: Router,
    private _oldContractService: OldcontractService
  ) { }

  ngOnInit() {
    this.getContract();
  }
  getContract() {
    this._oldContractService.getContract().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._oldContractService.tokenError();
      }
      if (res.status === 'success') {
        this.list_contract = res.list;
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectContract(contract) {
    this.contract_id = contract.contract_id;
    this.contract_id_stu_school = contract.stu_id_school;
    this.contract_room_name = contract.room_name;
    this.contract_id_recontract = contract.recontract_id;
    $('#contract-date').val(contract.contract_date_get_room);
    $('#contract-end').val(contract.contract_date_end);
    console.log(contract);
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
    this.de_contract_price = contract.contract_total;
  }
  clearSearch() {
    this.search_contract_id = '';
    this.search_stu_id = '';
  }
  searchContract() {
    const contract = JSON.stringify({
      contract_id: this.search_contract_id,
      stu_id: this.search_stu_id
    });
    // console.log(contract);
    this._oldContractService.searchContract(contract).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._oldContractService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        this.list_contract = res.list;
        console.log(this.list_contract);
        $('#searchModal').modal('toggle');
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
