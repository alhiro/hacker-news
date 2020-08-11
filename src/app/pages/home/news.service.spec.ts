import { Type } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule } from '@core';
import { HNService } from './news.service';

describe('NewService', () => {
  let newService: HNService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [HNService],
    });

    newService = TestBed.inject(HNService);
    httpMock = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getNews', () => {
    it('should return a Hacker News by default value by id', () => {
      // Arrange
      const mockNews = { value: 'default news' };

      // Act
      const NewsSubscription = newService.getNews({ id: '1' });

      // Assert
      NewsSubscription.subscribe((id: any) => {
        expect(id).toEqual(mockNews.value);
      });
      httpMock.expectOne({}).flush(mockNews);
    });

    it('should return a string in case of error', () => {
      // Act
      const NewsSubscription = newService.getNews({ id: '1' });

      // Assert
      NewsSubscription.subscribe((id: any) => {
        expect(typeof id).toEqual('string');
        expect(id).toContain('Error');
      });
      httpMock.expectOne({}).flush(null, {
        status: 500,
        statusText: 'error',
      });
    });
  });
});
