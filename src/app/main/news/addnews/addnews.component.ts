import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../core/app.config';
import { AddnewsService } from './addnews.service';
import { Router } from '@angular/router';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.css']
})
export class AddnewsComponent implements OnInit {
  public folder_picture: string = CONFIG.BASE_API + '/uploads/news/';
  public new_picture = '';
  public new_title = '';
  public new_content = '';
  public new_creater = '';
  constructor(
    private _addnewsService: AddnewsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getCreater();
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
  getCreater() {
    this._addnewsService.getCreater().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addnewsService.tokenError();
      }
      if (res.status === 'success') {
        this.new_creater = res.user.user_name;
        console.log(this.new_creater);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  addNews() {
    if (this.new_title === '') {
      toastr.warning('Bạn chưa nhập tiêu đề', 'Thông báo');
      $('#new-title').focus();
      return;
    }
    if (this.new_content === '') {
      toastr.warning('Bạn chưa nhập tiêu đề', 'Thông báo');
      $('#new-content').focus();
      return;
    }
    if (this.new_creater === '') {
      toastr.warning('Bạn hãy điền đủ thông tin cá nhân để hoàn thành chức năng này', 'Thông báo');
      return;
    }
    const news = JSON.stringify({
      new_title: this.new_title,
      new_content: this.new_content,
      new_picture: this.new_picture,
      new_creater: this.new_creater
    });
    // console.log(news);
    this._addnewsService.addNews(news).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._addnewsService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.new_title = '';
        this.new_content = '';
        this.new_picture = '';
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
