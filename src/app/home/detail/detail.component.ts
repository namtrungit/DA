import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailService } from './detail.service';
import { CONFIG } from '../../core/app.config';
declare var toastr: any;
declare var moment: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public folder_picture: string = CONFIG.BASE_API + '/uploads/news/';
  public new_id = 0;
  public new_title = '';
  public new_creater = '';
  public new_createdAt = '';
  public new_content = '';
  public new_picture = '';
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _detailService: DetailService
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.new_id = +params['id'];
    });
    console.log(this.new_id);
    this.getNewsById(this.new_id);
  }
  getNewsById(id) {
    this._detailService.getNewsById(id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (res.status === 'success') {
        // console.log(res);
        this.new_title = res.news.new_title;
        this.new_createdAt = moment(res.news.createdAt).format('DD/MM/YYYY');
        this.new_content = res.news.new_content;
        this.new_picture = res.news.new_picture;
        this.new_creater = res.news.new_creater;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
