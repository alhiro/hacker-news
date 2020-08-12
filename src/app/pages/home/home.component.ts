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

  @Input() itemID: any;
  items: any;
  data: any;
  newsID: any;

  constructor(private newsService: HNService) {
    //this.items = Array(30);
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
        //     // ...
        //   })

        //   return ArrayID;
        // }),
        // toArray()
      )
      .subscribe((item) => {
        console.log(item);

        let ArrayID: any = this.newsService.getItem({ id: item });

        ArrayID.forEach((id: any) => {
          console.log('idxxxx ' + JSON.stringify(id));
          // ...
        });
      });
  }

  getItem() {
    this.isLoading = true;
    this.newsService
      .getItem({ id: this.newsID })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data) => {
          this.data = data;
          console.log('itemm ' + JSON.stringify(this.data));
        },
        (error) => console.log('Error fetching stories ' + error)
      );
  }
}
