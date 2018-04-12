import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ClassSession } from './class-session';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {

  }

  loadUser(): Observable<User> {
    return this.httpClient.get(environment.apiEndpoint + '/user', {withCredentials: true})
      .map(res => <User>res);
  }



}
