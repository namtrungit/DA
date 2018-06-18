import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListnewsService } from './listnews.service';
import { CONFIG } from '../../../core/app.config';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-listnews',
  templateUrl: './listnews.component.html',
  styleUrls: ['./listnews.component.css']
})
export class ListnewsComponent implements OnInit {
  public p = 1;
  public folder_picture: string = CONFIG.BASE_API + '/uploads/news/';
  public list_news: Array<any> = [];
  public new_id = '';
  public new_title = '';
  public new_content = '';
  public new_creater = '';
  public new_picture = '';
  constructor(
    private _router: Router,
    private _listNewsService: ListnewsService
  ) { }

  ngOnInit() {
    this.getNews();
  }
  uploadPicture(e) {
    const formData = new FormData();
    formData.append('picture', e.target.files['0']);
    $.ajax({
      url: CONFIG.BASE_API + '/news/upload-picture',
      type: 'POST',
      data: formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false,  // tell jQuery not to set contentType
      success: (data) => {
        if (data.status === 'success') {
          toastr.success(data.message);
          this.new_picture = data.picture;
          console.log(data);
          return;
        }
        if (data.status === 'error') {
          console.log(data);
        }
      }
    });
  }
  getNews() {
    this._listNewsService.getNews().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._listNewsService.tokenError();
        return;
      }
      if (res.status === 'success') {
        this.list_news = res.list;
        console.log(res.list);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectNews(news) {
    this.new_id = news.new_id;
    this.new_title = news.new_title;
    this.new_content = news.new_content;
    this.new_creater = news.new_creater;
    this.new_picture = news.new_picture;
    console.log(news);
  }
  delNews() {
    this._listNewsService.delNews(this.new_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._listNewsService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getNews();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  updateNews() {
    if (this.new_title === '') {
      toastr.warning('Bạn chưa nhập tiêu đề', 'Thông báo');
      $('#new-title').focus();
      return;
    }
    if (this.new_content === '') {
      toastr.warning('Bạn chưa nhập nội dung', 'Thông báo');
      $('#new-title').focus();
      return;
    }
    const news = JSON.stringify({
      new_id: this.new_id,
      new_title: this.new_title,
      new_content: this.new_content,
      new_picture: this.new_picture
    });
    // console.log(news);
    this._listNewsService.updateNews(news).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._listNewsService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#updateModal').modal('toggle');
        this.getNews();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
