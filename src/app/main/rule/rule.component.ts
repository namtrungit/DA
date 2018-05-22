import { Component, OnInit } from '@angular/core';
import { RuleService } from './rule.service';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {
  public list_rule: Array<any> = [];
  // Create Modal
  public cre_rule_name = '';
  public cre_rule_content = '';

  // Update Modal
  public rule_id = '';
  public rule_name = '';
  public rule_content = '';
  constructor(
    private _ruleService: RuleService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRule();
  }
  getRule() {
    this._ruleService.getRule().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._ruleService.tokenError();
        return;
      }
      if (res.status === 'success') {
        this.list_rule = res.Rules;
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  addRule() {
    if (this.cre_rule_name === '') {
      toastr.warning('Bạn chưa nhập tên quy định', 'Thông báo');
      $('#cre-rule-name').focus();
      return;
    }
    if (this.cre_rule_content === '') {
      toastr.warning('Bạn chưa nhập nội dung quy định', 'Thông báo');
      $('#cre-rule-content').focus();
      return;
    }
    const rule = JSON.stringify({
      rule_name: this.cre_rule_name,
      rule_content: this.cre_rule_content
    });
    // console.log(rule);
    this._ruleService.addRule(rule).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._ruleService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#createModal').modal('toggle');
        this.getRule();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectRule(rule) {
    this.rule_id = rule.rule_id;
    this.rule_name = rule.rule_name;
    this.rule_content = rule.rule_content;
    // console.log(rule);
  }
  clearCreateRule() {
    this.cre_rule_name = '';
    this.cre_rule_content = '';
  }
  delRule() {
    this._ruleService.delRule(this.rule_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._ruleService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getRule();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  updateRule() {
    if (this.rule_name === '') {
      toastr.warning('Bạn chưa nhập tên quy định', 'Thông báo');
      $('#cre-rule-name').focus();
      return;
    }
    if (this.rule_content === '') {
      toastr.warning('Bạn chưa nhập nội dung quy định', 'Thông báo');
      $('#cre-rule-content').focus();
      return;
    }
    const rule = JSON.stringify({
      rule_id: this.rule_id,
      rule_name: this.rule_name,
      rule_content: this.rule_content
    });
    this._ruleService.updateRule(rule).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._ruleService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#updateModal').modal('toggle');
        this.getRule();
        return;
      }
     }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
