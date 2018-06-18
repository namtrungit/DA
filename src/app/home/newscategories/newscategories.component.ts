import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../core/app.config';
import { Router } from '@angular/router';
import { NewscategoriesService } from './newscategories.service';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-newscategories',
  templateUrl: './newscategories.component.html',
  styleUrls: ['./newscategories.component.css']
})
export class NewscategoriesComponent implements OnInit {
  public p = 1;
  public list_news: Array<any> = [];
  public folder_picture: string = CONFIG.BASE_API + '/uploads/news/';
  constructor(
    private _router: Router,
    private _newscategoriesService: NewscategoriesService
  ) { }

  ngOnInit() {
    this.getNews();
  }
  getNews() {
    this._newscategoriesService.getNews().subscribe(res => {
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
