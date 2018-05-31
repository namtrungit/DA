import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddreportService } from './addreport.service';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-addreport',
  templateUrl: './addreport.component.html',
  styleUrls: ['./addreport.component.css']
})
export class AddreportComponent implements OnInit {
  public list_rule: Array<any> = [];
  public list_stu: Array<any> = [];
  public giohangs: Array<any> = [];
  public idReport = '';
  public report_stu_id = '';
  public report_content = '';
  public rd_rule_id = '';
  public rd_content = '';
  constructor(
    private _router: Router,
    private _addReportService: AddreportService
  ) { }

  ngOnInit() {
    this.getRule();
    this.getStu();
    sessionStorage.removeItem('gioluat');
  }
  getRule() {
    this._addReportService.getRule().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addReportService.tokenError();
      }
      if (res.status === 'success') {
        this.list_rule = res.Rules;
        // console.log(this.list_rule);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getStu() {
    this._addReportService.getStu().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addReportService.tokenError();
      }
      if (res.status === 'success') {
        this.list_stu = res.list_id;
        // console.log(this.list_stu);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  createIdReport(): string {
    const date = new Date();
    const random = 'id' + Math.random().toString(30).slice(2);
    const nam = date.getFullYear().toString(),
      thang = date.getMonth().toString(),
      ngay = date.getDate().toString(),
      gio = date.getHours().toString(),
      phut = date.getMinutes().toString(),
      giay = date.getSeconds().toString(),
      nam1 = nam.substring(2);
    this.idReport = 'RP' + nam1.concat(thang, ngay, gio, random.substring(9));
    // console.log(this.idBill);
    return;
  }
  addRd() {
    if (this.rd_rule_id === '') {
      toastr.warning('Bạn chưa chọn nội quy', 'Thông báo');
      $('#rd-rule-id').focus();
      return;
    }
    if (this.rd_content === '') {
      toastr.warning('Bạn nhập hình thức xử lý', 'Thông báo');
      $('#rd-content').focus();
      return;
    }
    const obj = {
      rd_rule_id: this.rd_rule_id,
      rd_content: this.rd_content
    };
    console.log(obj);
    const lstRule = sessionStorage.getItem('gioluat');
    if (lstRule) {
      const sanpham = JSON.parse(lstRule);
      let i;
      for (i = 0; i < sanpham.length; i++) {
        if (sanpham[i].rd_rule_id === this.rd_rule_id) {
          toastr.warning('Nội quy này đã có trong biên bản rồi', 'Thông báo');
          return;
        }
      }
      sanpham.push(obj);
      const myJsString = JSON.stringify(sanpham);
      console.log('chuoi mystring ' + myJsString);
      sessionStorage.setItem('gioluat', myJsString);
      this.thongtingio();
    } else {
      const myJsString = JSON.stringify(obj);
      sessionStorage.setItem('gioluat', '[' + myJsString + ']');
      this.thongtingio();
    }
    this.rd_content = '';
    this.rd_rule_id = '';
  }
  thongtingio() {
    this.giohangs = this._addReportService.getContent();
  }
  xoaItemgiohang(rd) {
    const obj = {
      rd_rule_id: rd['rd_rule_id']
    };
    // console.log(obj);
    const arrGiohangmoi = new Array();
    const lstRule = sessionStorage.getItem('gioluat');
    const sanpham = JSON.parse(lstRule);
    console.log(lstRule);
    if (lstRule) {
      let j;
      for (j = 0; j < sanpham.length; j++) {
        if (sanpham[j].rd_rule_id === obj['rd_rule_id']) {
          sanpham.splice(j, 1);
          break;
        }
      }
    }
    const myJString = JSON.stringify(sanpham);
    sessionStorage.setItem('gioluat', myJString);
    this.thongtingio();
  }
  Pay() {
    this.createIdReport();
    if (this.report_stu_id === '') {
      toastr.warning('Bạn chưa nhập mã sinh viên', 'Thông báo');
      $('#report-stu-id').focus();
      return;
    }
    if (this.report_content === '') {
      toastr.warning('Bạn chưa nhập nội dung biên bản', 'Thông báo');
      $('#report-content').focus();
      return;
    }
    // console.log(this.giohangs);
    if (this.giohangs.length === 0) {
      toastr.warning('Bạn chưa thêm nội quy vi phạm', 'Thông báo');
      return;
    }
    const report = JSON.stringify({
      report_id: this.idReport,
      report_stu_id: this.report_stu_id,
      report_content: this.report_content
    });
    console.log('report: ' + report);
    this._addReportService.addReport(report).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addReportService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.report_stu_id = '';
        this.report_content = '';
        // Thêm chi tiết biên bản
        const lstRule = sessionStorage.getItem('gioluat');
        console.log(lstRule);
        if (lstRule) {
          const noiquy = JSON.parse(lstRule);
          for (let i = 0; i < noiquy.length; i++) {
            const rd = JSON.stringify({
              rd_report_id: this.idReport,
              rd_rule_id: noiquy[i].rd_rule_id,
              rd_content: noiquy[i].rd_content
            });
            // console.log(rd);
            // return;
            // tslint:disable-next-line:no-shadowed-variable
            this._addReportService.addRd(rd).subscribe(res => {
              if (res.status === 'error') {
                toastr.error(res.message);
                return;
              }
              if (!res.isAuth && res.status === 'error') {
                return this._addReportService.tokenError();
              }
              if (res.status === 'warning') {
                toastr.warning(res.message);
                return;
              }
            }, error => {
              console.log('Không nết nối được tới máy chủ');
              this._router.navigate(['error']);
              return;
            });
          }
          sessionStorage.removeItem('gioluat');
          this.thongtingio();
        }
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
