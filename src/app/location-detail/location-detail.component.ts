import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../address';
import { AddressesService } from '../addresses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {
  address: Address;
  address$: Observable<Address>;
  saving = false;

  constructor(private route: ActivatedRoute, private router: Router, private addressesService: AddressesService) { }

  ngOnInit() {
    this.address$ = this.route.paramMap
    .switchMap((params: ParamMap) => {
      const id = params.get('id');
      if (id === 'new') {
        return <Observable<Address>>Observable.of({
          addressKey: null,
          addressLine1: null,
          addressLine2: null,
          city: null,
          countrySubdivision: null,
          postalCode: null
        });
      }
      return this.addressesService.read(id);
    });
    this.address$.subscribe(cs => this.address = cs);
  }

  onSubmit() {
    this.saving = true;
    if (this.address.addressKey) {
      const csUpdate$ = this.addressesService.update(this.address);
      csUpdate$.subscribe(a => this.address = a, err => {}, () => { this.saving = false; });
    } else {
      const csCreate$ = this.addressesService.create(this.address);
      csCreate$.subscribe(a => {
        this.address = a;
        this.router.navigate(['../', a.addressKey], {relativeTo: this.route})
      }, err => {}, () => { this.saving = false; });
    }
  }
}
