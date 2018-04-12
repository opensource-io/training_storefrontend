import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ClassSession } from './class-session';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class ClassSessionsService {

  private serviceUrl = 'class-sessions';

  constructor(private httpClient: HttpClient) {}

  create(classSession: ClassSession) {
    const url = environment.apiEndpoint + '/' + this.serviceUrl;
    return <Observable<ClassSession>>this.httpClient.post(url, classSession, {withCredentials: true});
  }

  read(id: string | number) {
    const url = environment.apiEndpoint + '/' + this.serviceUrl + '/' + id;
    return <Observable<ClassSession>>this.httpClient.get(url, {withCredentials: true});
  }

  readAll(): Observable<ClassSession[]> {
    let params = new HttpParams();
    params = params.append('size', '100');
    params = params.append('sort', 'classSessionStartDate');
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

  update(classSession: ClassSession) {
    const url = environment.apiEndpoint + '/' + this.serviceUrl + '/' + classSession.classSessionKey;
    return <Observable<ClassSession>>this.httpClient.put(url, classSession, {withCredentials: true});
  }

  delete(id: string | number) {
    return this.httpClient.delete(environment.apiEndpoint + '/' + this.serviceUrl + '/' + id, {withCredentials: true});
  }

}
