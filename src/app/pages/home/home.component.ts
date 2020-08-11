import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';

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

  constructor(private newsService: HNService) {}

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.isLoading = true;
    this.newsService.getNews({data: this.items})
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        items => {this.items = items; console.log('stories ' + items)},
        error => console.log('Error fetching stories ' + error));
  }
  
}
