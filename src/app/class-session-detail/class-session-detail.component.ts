import { Component, OnInit, Input } from '@angular/core';
import { ClassSession } from '../class-session';
import { ClassSessionsService } from '../class-sessions.service';
import { Sku } from '../sku';
import { SkusService } from '../skus.service';
import { Address } from '../address';
import { AddressesService } from '../addresses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-class-session-detail',
  templateUrl: './class-session-detail.component.html',
  styleUrls: ['./class-session-detail.component.scss']
})
export class ClassSessionDetailComponent implements OnInit {
  classSession: ClassSession;
  classSession$: Observable<ClassSession>;
  skus: Sku[];
  addresses: Address[];
  saving = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private skusService: SkusService,
    private addressesService: AddressesService,
    private classSessionsService: ClassSessionsService
  ) { }

  ngOnInit() {
    this.classSession$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (id === 'new') {
          return <Observable<ClassSession>>Observable.of({
            classSessionKey: null,
            classSessionSku: {
              skuKey: null
            },
            classSessionAddress: {
              addressKey: null
            },
            classSessionStartDate: (new Date()).toISOString().substring(0, 10),
            classSessionStartTime: '09:00',
            classSessionEndTime: '17:00',
            classSessionTimeZone: 'CST'
          });
        }
        return this.classSessionsService.read(id);
      });
    this.classSession$.subscribe(cs => this.classSession = cs);

    const skus$ = this.skusService.readAll();
    skus$.subscribe(
        skus => this.skus = skus,
        (err: HttpErrorResponse) => {
            if (err.status === 401 || err.status === 403) {
                this.router.navigate(['/logout']);
            }
        }
    );
    const addresses$ = this.addressesService.readAll();
    addresses$.subscribe(
      addresses => this.addresses = addresses,
        (err: HttpErrorResponse) => {
            if (err.status === 401 || err.status === 403) {
                this.router.navigate(['/logout']);
            }
        }
    );
  }

  onSubmit() {
    this.saving = true;
    if (this.classSession.classSessionKey) {
      const csUpdate$ = this.classSessionsService.update(this.classSession);
      csUpdate$.subscribe(cs => this.classSession = cs, err => {}, () => { this.saving = false; });
    } else {
      const csCreate$ = this.classSessionsService.create(this.classSession);
      csCreate$.subscribe(cs => {
        this.classSession = cs;
        this.router.navigate(['../', cs.classSessionKey], {relativeTo: this.route})
      }, err => {}, () => { this.saving = false; });
    }
  }

}
