import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  news: `/askstories.json`,
  item: (c: Item) => `/item/${c.id}.json`,
};

export interface News {
  // The news's all
  data: any;
}

export interface Item {
  // The news's id
  id: any;
}

@Injectable({
  providedIn: 'root',
})
export class HNService {
  constructor(private http: HttpClient) {}

  getNews(): Observable<any> {
    return this.http.get(routes.news);
  }

  getItem(context: Item): Observable<any> {
    return this.http.get(routes.item(context));
  }
}
