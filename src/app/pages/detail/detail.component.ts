import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HNService } from '../home/news.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  isLoading = false;

  @Input() commentID: number;

  item: any;
  comments: any;
  listComments: any;

  pipe = new DatePipe('en-US');
  date: any;

  constructor(private newsService: HNService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this.isLoading = true;
    const detailID = this.route.snapshot.paramMap.get('id');

    this.newsService
      .getItem({ id: detailID })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data) => {
          // get response data
          this.item = data;

          // count length comment
          this.comments = data.kids.length;

          // get comment
          this.listComments = data.kids;

          // format date to hour
          const now = data.time;
          const time = this.pipe.transform(now, 'h');
          this.date = time;

          // console.log('stories item ' + JSON.stringify(data));
        },
        (error) => console.log('Error get detail stories item' + error)
      );
  }
}
