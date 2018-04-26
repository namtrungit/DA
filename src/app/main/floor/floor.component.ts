import { Component, OnInit } from '@angular/core';
import { FloorService } from './floor.service';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {
  public list_floor: Array<any> = [];
  // add
  public floor_id: number;
  // select
  public sl_floor_id: number;
  constructor(
    private _floorService: FloorService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getFloor();
  }
  getFloor() {
    this._floorService.getFloor().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._floorService.tokenError();
      }
      if (res.status === 'success') {
        this.list_floor = res.Floors;
        console.log(this.list_floor);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  clearFloor() {
    this.floor_id = undefined;
  }
  addFloor() {
    if (this.floor_id === undefined) {
      toastr.warning('Bạn chưa nhập dãy', 'Thông báo');
      $('#floor-id').focus();
      return;
    }
    const floor = JSON.stringify({
      floor_id: this.floor_id
    });
    this._floorService.addFloor(floor).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._floorService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getFloor();
        this.clearFloor();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectFloor(floor) {
    this.sl_floor_id = floor.floor_id;
    // console.log(floor.floor_id);
  }
  delFloor(floor_id) {
    this._floorService.delFloor(this.sl_floor_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._floorService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getFloor();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
