import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Address } from './address';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class AddressesService {

  private serviceUrl = 'addresses';

  constructor(private httpClient: HttpClient) {}

  create(address: Address) {
    const url = environment.apiEndpoint + '/' + this.serviceUrl;
    return <Observable<Address>>this.httpClient.post(url, address, {withCredentials: true});
  }

  read(id: string | number) {
    const url = environment.apiEndpoint + '/' + this.serviceUrl + '/' + id;
    return <Observable<Address>>this.httpClient.get(url, {withCredentials: true});
  }

  readAll(): Observable<Address[]> {
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

  update(address: Address) {
    const url = environment.apiEndpoint + '/' + this.serviceUrl + '/' + address.addressKey;
    return <Observable<Address>>this.httpClient.put(url, address, {withCredentials: true});
  }

  delete(id: string | number) {
    return this.httpClient.delete(environment.apiEndpoint + '/' + this.serviceUrl + '/' + id, {withCredentials: true});
  }

}
