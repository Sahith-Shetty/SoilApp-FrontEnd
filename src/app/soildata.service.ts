import { Injectable } from '@angular/core';
import { Soil } from './soil';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SoildataService {
  baseApiUrl = 'http://40.88.127.123:5035';
  constructor(private httpClient: HttpClient) { }

  getSoilDetails() {
    const apiUrl = '/';
    return this.httpClient.get<any>(this.baseApiUrl + apiUrl)
    .pipe(tap((resData) => {
      return resData.map(e => new Soil(e));
    }));

  }

  searchSoilDetails(query) {
    const apiUrl = '/search';
    let searchParams = new HttpParams();
    searchParams = searchParams.append('query', query);
    return this.httpClient.get<any>(this.baseApiUrl + apiUrl, {params: searchParams})
    .pipe(tap((resData) => {
      if (!resData) {
        return;
      }
      return resData.map(e => new Soil(e));
    }));

  }
  searchByNPK(query) {
    const apiUrl = '/npk';
    let searchParams = new HttpParams();
    searchParams = query.n ? searchParams.append('n', query.n) : searchParams;
    searchParams = query.p ? searchParams.append('p', query.p) : searchParams;
    searchParams = query.k ? searchParams.append('k', query.k) : searchParams;
    return this.httpClient.get<any>(this.baseApiUrl + apiUrl, {params: searchParams})
    .pipe(tap((resData) => {
      if (!resData) {
        return;
      }
      return resData.map(e => new Soil(e));
    }));

  }
}
