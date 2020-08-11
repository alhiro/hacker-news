import { Component, OnInit, Input } from '@angular/core';

import { HNService } from '../home/news.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  isLoading = false;

  @Input() itemID: number;
  items: any;
  comments: any;
  listComments: any;

  pipe = new DatePipe('en-US'); 
  date: any;

  constructor(
    private newsService: HNService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this.isLoading = true;
    const detailID = this.route.snapshot.paramMap.get('itemID');
    this.newsService.getItem({id: detailID})
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        data => {
          // get response data
          this.items = data;

          // count length comment
          this.comments = data.kids.length;

          // get comment
          this.listComments = data.kids;

          // format date to hour
          const now = data.time;
          const time = this.pipe.transform(now, 'h');
          this.date = time;

          console.log('stories item ' + JSON.stringify(data))
        },
        error => console.log('Error fetching stories item' + error));
  }
}
