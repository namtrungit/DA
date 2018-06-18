import { Component, OnInit } from '@angular/core';
import { StuindexService } from './stuindex.service';
import { Router } from '@angular/router';
import { CONFIG } from '../../core/app.config';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-stuindex',
  templateUrl: './stuindex.component.html',
  styleUrls: ['./stuindex.component.css']
})
export class StuindexComponent implements OnInit {
  public list_news: Array<any> = [];
  public folder_picture: string = CONFIG.BASE_API + '/uploads/news/';
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
