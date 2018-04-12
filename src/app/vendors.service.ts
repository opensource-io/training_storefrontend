import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vendor } from './vendor';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class VendorsService {

  private serviceUrl = 'vendors';

  constructor(private httpClient: HttpClient) {}

  create(vendor: Vendor) {
    const url = environment.apiEndpoint + '/' + this.serviceUrl;
    return <Observable<Vendor>>this.httpClient.post(url, vendor, {withCredentials: true});
  }

  read(id: string | number) {
    const url = environment.apiEndpoint + '/' + this.serviceUrl + '/' + id;
    return <Observable<Vendor>>this.httpClient.get(url, {withCredentials: true});
  }

  readAll(): Observable<Vendor[]> {
    const url = environment.apiEndpoint + '/' + this.serviceUrl;
    return this.httpClient.get(url, {
      responseType: 'json',
      withCredentials: true
    })
      .map(
        res => res['_embedded'][this.serviceUrl]
    );
  }

  update(vendor: Vendor) {
    const url = environment.apiEndpoint + '/' + this.serviceUrl + '/' + vendor.vendorKey;
    return <Observable<Vendor>>this.httpClient.put(url, vendor, {withCredentials: true});
  }

  delete(id: string | number) {
    return this.httpClient.delete(environment.apiEndpoint + '/' + this.serviceUrl + '/' + id, {withCredentials: true});
  }

}
