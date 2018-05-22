import { Component, OnInit } from '@angular/core';
import { ContractService } from './contract.service';
import { Router } from '@angular/router';
import { CONFIG } from '../../core/app.config';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  public list_contract: Array<any> = [];
  public list_recenbale: Array<any> = [];
  public list_room: Array<any> = [];
  // create Modal
  public cre_contract_id = '';
  public cre_contract_id_stu_school = '';
  public cre_contract_room_name = '';
  public cre_contract_id_recontract = '';
  public cre_contract_create = '';

  // del and update modal
  public contract_id = '';
  public contract_id_stu_school = '';
  public contract_room_name = '';
  public contract_id_recontract = '';

  // autotext
  public showDD = false;

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
    private _contractService: ContractService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRoom();
    this.getContract();
    this.getRecenable();
    this.getCreate();
    $('#cre-contract-date').datetimepicker({
      format: 'DD/MM/YYYY'
    });
    $('#contract-date').datetimepicker({
      format: 'DD/MM/YYYY'
    });
    $('#cre-contract-end').datetimepicker({
      format: 'DD/MM/YYYY'
    });
    $('#contract-end').datetimepicker({
      format: 'DD/MM/YYYY'
    });
  }
  createIdContract(): string {
    const date = new Date();
    const random = 'id' + Math.random().toString(30).slice(2);
    const nam = date.getFullYear().toString(),
      thang = date.getMonth().toString(),
      ngay = date.getDate().toString(),
      gio = date.getHours().toString(),
      phut = date.getMinutes().toString(),
      giay = date.getSeconds().toString(),
      nam1 = nam.substring(2);
    this.cre_contract_id = 'HD' + nam1.concat(thang, ngay, gio, random.substring(9));
    // console.log(this.idBill);
    return;
  }
  selectContract(contract) {
    this.contract_id = contract.contract_id;
    this.contract_id_stu_school = contract.stu_id_school;
    this.contract_room_name = contract.room_name;
    this.contract_id_recontract = contract.recontract_id;
    $('#contract-date').val(contract.contract_date_get_room);
    $('#contract-end').val(contract.contract_date_end);
    this.showDD = false;
    console.log(contract);
  }
  clearCreateContract() {
    this.cre_contract_id = '';
    this.cre_contract_id_stu_school = '';
    this.cre_contract_room_name = '';
    this.cre_contract_id_recontract = '';
    $('#cre-contract-date').val(null);
    this.showDD = false;
  }
  getCreate() {
    this._contractService.getCreate().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractService.tokenError();
      }
      if (res.status === 'success') {
        this.cre_contract_create = res.user.user_name;
        // console.log(this.cre_contract_create);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getContract() {
    this._contractService.getContract().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractService.tokenError();
      }
      if (res.status === 'success') {
        this.list_contract = res.Contracts;
        // console.log(this.list_contract);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getRoom() {
    this._contractService.getRoom().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractService.tokenError();
      }
      if (res.status === 'success') {
        this.list_room = res.Rooms;
        console.log(this.list_room);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getRecenable() {
    this._contractService.getRecEnable().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractService.tokenError();
      }
      if (res.status === 'success') {
        this.list_recenbale = res.list;
        // console.log(res);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  addContract() {
    this.createIdContract();
    // validate
    if (this.cre_contract_id_stu_school === '') {
      toastr.warning('Bạn chưa nhập mã sinh viên', 'Thông báo');
      $('#cre-contract-id-stu-school').focus();
      return;
    }
    if (this.cre_contract_room_name === '') {
      toastr.warning('Bạn chưa nhập phòng', 'Thông báo');
      $('#cre-contract-room-name').focus();
      return;
    }
    if (this.cre_contract_id_recontract === '') {
      toastr.warning('Bạn chưa loại hợp đồng', 'Thông báo');
      $('#cre-contract-id-recontract').focus();
      return;
    }
    if ($('#cre-contract-date').val() === '') {
      toastr.warning('Bạn chưa chọn ngày nhận phòng', 'Thông báo');
      $('#cre-contract-date').focus();
      return;
    }
    if ($('#cre-contract-end').val() === '') {
      toastr.warning('Bạn chưa chọn ngày kết thúc hợp đồng', 'Thông báo');
      $('#cre-contract-end').focus();
      return;
    }
    if (this.cre_contract_create === '') {
      toastr.warning('Bạn chưa cập nhật tên ở phần thông tin tài khoản', 'Thông báo');
      return;
    }
    const contract = JSON.stringify({
      contract_id: this.cre_contract_id,
      contract_date_get_room: $('#cre-contract-date').val(),
      contract_date_end: $('#cre-contract-end').val(),
      contract_room_name: this.cre_contract_room_name,
      contract_id_stu_school: this.cre_contract_id_stu_school,
      contract_id_recontract: this.cre_contract_id_recontract,
      contract_create: this.cre_contract_create
    });
    // console.log(contract);
    // return;
    this._contractService.addContract(contract).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractService.tokenError();
      }
      if (res.status === 'warning stu') {
        toastr.warning('Sinh viên này không có trong cơ sở dữ liệu', 'Thông báo');
        $('#cre-contract-id-stu-school').focus();
        return;
      }
      if (res.status === 'warning room') {
        toastr.warning('Phòng này không có trong cơ sở dữ liệu', 'Thông báo');
        $('#cre-contract-room-name').focus();
        return;
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        $('#cre-contract-end').focus();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#createModal').modal('toggle');
        this.getContract();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  updateContract() {
    if (this.contract_id === '') {
      toastr.warning('ID hợp đồng không được tìm thấy', 'Thông báo');
      return;
    }
    if (this.contract_id_stu_school === null) {
      toastr.warning('Bạn chưa nhập mã sinh viên', 'Thông báo');
      $('#contract-id-stu-school').focus();
      return;
    }
    if (this.contract_room_name === '') {
      toastr.warning('Bạn chưa nhập phòng', 'Thông báo');
      $('#contract-room-name').focus();
      return;
    }
    if (this.contract_id_recontract === '') {
      toastr.warning('Bạn chưa loại hợp đồng', 'Thông báo');
      $('#contract-id-recontract').focus();
      return;
    }
    if ($('#contract-date').val() === '') {
      toastr.warning('Bạn chưa chọn ngày nhận phòng', 'Thông báo');
      $('#contract-date').focus();
      return;
    }
    if ($('#contract-end').val() === '') {
      toastr.warning('Bạn chưa chọn ngày kết thúc hợp đồng', 'Thông báo');
      $('#contract-end').focus();
      return;
    }
    const contract = JSON.stringify({
      contract_id: this.contract_id,
      contract_date_get_room: $('#contract-date').val(),
      contract_date_end: $('#contract-end').val(),
      contract_room_name: this.contract_room_name,
      contract_id_stu_school: this.contract_id_stu_school,
      contract_id_recontract: this.contract_id_recontract
    });
    // console.log(contract);
    this._contractService.updateContract(contract).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractService.tokenError();
      }
      if (res.status === 'warning stu') {
        toastr.warning('Sinh viên này không có trong cơ sở dữ liệu', 'Thông báo');
        return;
      }
      if (res.status === 'warning room') {
        toastr.warning('Phòng này không có trong cơ sở dữ liệu', 'Thông báo');
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#updateModal').modal('toggle');
        this.getContract();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  delContract() {
    this._contractService.delContract(this.contract_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#delModal').modal('toggle');
        this.getContract();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }


  // Autocomplete textbox room
  toggleDropDown() {
    this.showDD = !this.showDD;
  }
  RoomDCreTap() {
    const room_name_s = JSON.stringify({
      room_name_s: this.cre_contract_room_name
    });
    // console.log(room_name_s);
    this._contractService.getRoomText(room_name_s).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractService.tokenError();
      }
      if (res.status === 'success') {
        this.list_room = res.Rooms;
        // console.log(this.room);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  RoomDUpdateTap() {
    const room_name_s = JSON.stringify({
      room_name_s: this.contract_room_name
    });
    // console.log(room_name_s);
    this._contractService.getRoomText(room_name_s).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._contractService.tokenError();
      }
      if (res.status === 'success') {
        this.list_room = res.Rooms;
        // console.log(this.room);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectListCre(room) {
    this.cre_contract_room_name = room.room_name;
  }
  selectListUpdate(room) {
    this.contract_room_name = room.room_name;
  }

  // Detail modal
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
