import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HNService } from '@app/pages/home/news.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  isLoading = false;

  @Input() commentID: number;

  item: any;
  listComments: any;

  pipe = new DatePipe('en-US');
  date: any;

  constructor(private newsService: HNService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this.isLoading = true;
    this.newsService
      .getItem({ id: this.commentID })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data) => {
          // get response data
          this.item = data;

          console.log('stories comment' + JSON.stringify(data));
        },
        (error) => console.log('Error fetching stories comment' + error)
      );
  }
}
