import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Instructor } from './instructor';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class InstructorsService {

  constructor(private http: HttpClient) {

  }

  loadInstructors(): Observable<Instructor[]> {
    const params = new HttpParams();
    params.set('size', '100');
    params.set('sort', 'instructor-name');
    const options = { params: params };

    return this.http.get(environment.apiEndpoint + '/instructors', options)
      .map(
        res => res['_embedded']['instructors']
      );
  }

}
