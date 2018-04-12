import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Sku } from './sku';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class SkusService {

  private serviceUrl = 'skus';

  constructor(private httpClient: HttpClient) {}

  create(sku: Sku) {
    const url = environment.apiEndpoint + '/' + this.serviceUrl;
    return <Observable<Sku>>this.httpClient.post(url, sku, {withCredentials: true});
  }

  read(id: string | number) {
    const url = environment.apiEndpoint + '/' + this.serviceUrl + '/' + id;
    return <Observable<Sku>>this.httpClient.get(url, {withCredentials: true});
  }

  readAll(): Observable<Sku[]> {
    let params = new HttpParams();
    params = params.append('size', '100');
    params = params.append('sort', 'city');
    const url = environment.apiEndpoint + '/' + this.serviceUrl;
    return this.httpClient.get(url, {
      params: params,
      responseType: 'json',
      withCredentials: true
    })
      .map(
        res => res['_embedded'][this.serviceUrl]
    );
  }

  update(sku: Sku) {
    const url = environment.apiEndpoint + '/' + this.serviceUrl + '/' + sku.skuKey;
    return <Observable<Sku>>this.httpClient.put(url, sku, {withCredentials: true});
  }

  delete(id: string | number) {
    return this.httpClient.delete(environment.apiEndpoint + '/' + this.serviceUrl + '/' + id, {withCredentials: true});
  }

}
