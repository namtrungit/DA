import { Component, OnInit } from '@angular/core';
import { ElecService } from './elec.service';
import { Router } from '@angular/router';
declare var toastr: any;
@Component({
  selector: 'app-elec',
  templateUrl: './elec.component.html',
  styleUrls: ['./elec.component.css']
})
export class ElecComponent implements OnInit {
  public p = 1;
  public list_area: Array<any> = [];
  public list_elec: Array<any> = [];
  public area_id = '';
  constructor(
    private _elecService: ElecService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getArea();
  }
  getArea() {
    this._elecService.getArea().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (res.status === 'success') {
        this.list_area = res.Areas;
        console.log(this.list_area);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  postArea() {
    // console.log(this.area_id);
    const area = JSON.stringify({
      area_id: this.area_id
    });
    this._elecService.postArea(area).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        this.list_elec = res.list;
        // console.log(res);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
