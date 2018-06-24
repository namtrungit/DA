import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartserviceService } from './chartservice.service';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-chartservice',
  templateUrl: './chartservice.component.html',
  styleUrls: ['./chartservice.component.css']
})
export class ChartserviceComponent implements OnInit {
  public year;
  public list_chart_service: Array<any> = [];
  public chartService;
  public chartContract;
  public chartReport;
  public area_quantity;
  public current_contract;
  public room_quantity;
  public empty_room;
  //
  id = 'chart';
  width = 600;
  height = 400;
  type = 'column2d';
  type1 = 'pie3d';
  dataFormat = 'json';
  title = 'Angular4 FusionCharts Sample';

  constructor(
    private _router: Router,
    private _charService: ChartserviceService
  ) {
    const today = new Date();
    this.year = today.getFullYear();
  }

  ngOnInit() {
    this.getChartService(this.year);
    this.getChartContract(this.year);
    this.getChartReport(this.year);
    this.getQuantityArea();
    this.getCurrentContract();
    this.getQuantityRoom();
    this.getEmptyRoom();
  }
  getChartService(year) {
    this._charService.getChartService(year).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._charService.tokenError();
      }
      if (res.status === 'success') {
        this.chartService = {
          'chart': {
            'caption': 'Ký túc xá hutech',
            'subCaption': 'Doanh thu dịch vụ năm ' + year,
            'numberprefix': '',
            'theme': 'fint'
          },
          'data': res.list
        };
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getChartContract(year) {
    this._charService.getChartContract(year).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._charService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        this.chartContract = {
          'chart': {
            'caption': 'Ký túc xá hutech',
            'subCaption': 'Doanh thu hợp đồng năm ' + year,
            'numberprefix': '',
            'theme': 'ocean'
          },
          'data': res.list
        };
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getChartReport(year) {
    this._charService.getChartReport(year).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._charService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        this.chartReport = {
          'chart': {
            'caption': 'Ký túc xá hutech',
            'subCaption': 'Số lượng biên bản vi phạm năm ' + year,
            'startingangle': '120',
            'showlabels': '0',
            'showlegend': '1',
            'enablemultislicing': '0',
            'slicingdistance': '15',
            'showpercentvalues': '1',
            'showpercentintooltip': '0',
            'plottooltext': 'Tháng : $label Số biên bản : $datavalue',
            'theme': 'ocean'
          },
          'data': res.list
        };
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  pushYear() {
    if (this.year === 0) {
      toastr.warning('Năm bạn nhập vào không hợp lệ', 'Thông báo');
      $('#year').focus();
      return;
    }
    this.getChartContract(this.year);
    this.getChartService(this.year);
    this.getChartReport(this.year);
    $('#yearModal').modal('toggle');
  }
  clearYear() {
    this.year = 0;
  }
  getQuantityArea() {
    this._charService.getQuantityArea().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._charService.tokenError();
      }
      if (res.status === 'success') {
        this.area_quantity = res.quantity[0].quantity_area;
      }
     }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
     });
  }
  getCurrentContract() {
    this._charService.getCurrentContract().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._charService.tokenError();
      }
      if (res.status === 'success') {
        // console.log(res);
        this.current_contract = res.total[0].total;
      }
     }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
     });
  }
  getQuantityRoom() {
    this._charService.getQuantityRoom().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._charService.tokenError();
      }
      if (res.status === 'success') {
        this.room_quantity = res.room_quantity[0].quantity_room;
        // console.log(res);
      }
     }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
     });
  }
  getEmptyRoom() {
    this._charService.getEmptyRoom().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._charService.tokenError();
      }
      if (res.status === 'success') {
        this.empty_room = res.quantity[0].empty;
      }
     }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
     });
  }
}
