import { Component, OnInit, Input } from '@angular/core';
import { finalize, concatMap, switchMap, toArray } from 'rxjs/operators';

import { HNService } from './news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;

  @Input() itemID: number;
  items: any;

  constructor(private newsService: HNService) {
    // this.items = Array(20);
    // I think this is not good API from Hacker News with method by id for repeat the detail. Making slow app
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.isLoading = true;
    this.newsService
      .getNews()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
        // concatMap((x: any) => x),
        // switchMap((x: any) => {

        //   let ArrayID: any = this.newsService.getItem({ id: x });

        //   ArrayID.forEach((id: any) => {
        //     console.log("id " + JSON.stringify(id));
        //   })

        //   return ArrayID;
        // }),
        // toArray()
      )
      .subscribe((item) => (this.items = item));
  }
}
