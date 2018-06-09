import { Component, OnInit } from '@angular/core';
import { StuindexService } from './stuindex.service';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-stuindex',
  templateUrl: './stuindex.component.html',
  styleUrls: ['./stuindex.component.css']
})
export class StuindexComponent implements OnInit {
  public list_news: Array<any> = [];
  constructor(
    private _stuIndexService: StuindexService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getNews();
  }
  getNews() {
    this._stuIndexService.getNews().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (res.status === 'success') {
        this.list_news = res.list;
        console.log(this.list_news);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
