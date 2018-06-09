import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListreportService } from './listreport.service';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-listreport',
  templateUrl: './listreport.component.html',
  styleUrls: ['./listreport.component.css']
})
export class ListreportComponent implements OnInit {
  public list_report: Array<any> = [];
  public list_rule: Array<any> = [];
  public list_rd: Array<any> = [];
  public list_stu: Array<any> = [];
  // Rd
  public rd_rule_id = '';
  public rd_content = '';
  // Del và update modal
  public report_id = '';
  public report_stu_id = '';
  public report_content = '';
  // Details modal
  public de_report_id = '';
  public de_report_stu_id = '';
  public de_report_stu_name = '';
  public de_report_class = '';
  public de_report_faculty = '';
  public de_report_createdAt = '';
  public de_report_creater = '';
  public de_report_content = '';
  // Search Modal
  public search_report_id = '';
  public search_stu_id = '';
  constructor(
    private _router: Router,
    private _listReportService: ListreportService
  ) { }

  ngOnInit() {
    this.getReport();
    this.getRule();
    this.getStu();
  }
  getStu() {
    this._listReportService.getStu().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listReportService.tokenError();
      }
      if (res.status === 'success') {
        this.list_stu = res.list_id;
        console.log(this.list_stu);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getReport() {
    this._listReportService.getReport().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listReportService.tokenError();
      }
      if (res.status === 'success') {
        this.list_report = res.list;
        console.log(this.list_report);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getRule() {
    this._listReportService.getRule().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listReportService.tokenError();
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
  getRd(report_id) {
    this._listReportService.getRd(report_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listReportService.tokenError();
      }
      if (res.status === 'success') {
        this.list_rd = res.list_rd;
        console.log(this.list_rd);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  delReport() {
    this._listReportService.delReport(this.report_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listReportService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getReport();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectReport(report) {
    this.report_id = report.report_id;
    this.report_stu_id = report.stu_id_school;
    this.report_content = report.report_content;
    this.getRd(this.report_id);
    this.clearRd();
    console.log(report);
    // Details modal
    this.de_report_id = report.report_id;
    this.de_report_stu_id = report.stu_id_school;
    this.de_report_stu_name = report.stu_name;
    this.de_report_class = report.class_name;
    this.de_report_faculty = report.fal_name;
    this.de_report_createdAt = report.createdAt;
    this.de_report_creater = report.report_creater;
    this.de_report_content = report.report_content;
  }
  clearRd() {
    this.rd_rule_id = '';
    this.rd_content = '';
  }
  delRd(rd) {
    console.log(rd.rd_id);
    this._listReportService.delRd(rd.rd_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listReportService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getRd(this.report_id);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  addRd() {
    const rd = JSON.stringify({
      rd_report_id: this.report_id,
      rd_rule_id: this.rd_rule_id,
      rd_content: this.rd_content
    });
    console.log(rd);
    this._listReportService.addRd(rd).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listReportService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getRd(this.report_id);
        this.clearRd();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  updateReport() {
    const report = JSON.stringify({
      report_id: this.report_id,
      report_stu_id: this.report_stu_id,
      report_content: this.report_content
    });
    console.log(report);
    this._listReportService.updateReport(report).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listReportService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getReport();
        this.clearRd();
        $('#updateModal').modal('toggle');
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  clearSearch() {
    this.search_report_id = '';
    this.search_stu_id = '';
  }
  findReport() {
    const report = JSON.stringify({
      report: this.search_report_id,
      stu: this.search_stu_id
    });
    // console.log(report);
    this._listReportService.findReport(report).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listReportService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        this.list_report = res.list;
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
