import { Component, OnInit } from '@angular/core';
import { Address } from '../address';
import { AddressesService } from '../addresses.service';
import { routerTransition } from '../router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-locations',
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.scss'],
    animations: [routerTransition()],
    providers: []
})
export class LocationsComponent implements OnInit {

    addresses: Address[];

    constructor(public route: ActivatedRoute, public router: Router, private addressesService: AddressesService) {
    }

    ngOnInit() {
        this.loadAddresses();
    }

    loadAddresses() {
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

    onCreate($event: Event) {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    onUpdate($event: Event, address: Address) {
        this.router.navigate([address.addressKey], {relativeTo: this.route});
    }

    onDelete($event: Event, address: Address) {
        $event.stopPropagation();
        if (confirm('Are you sure to delete ' + address.city + ' ' + address.countrySubdivision + '?')) {
            const classSessionDelete$ = this.addressesService.delete(address.addressKey);
            classSessionDelete$.subscribe(
                data => {
                    this.loadAddresses();
                },
                err => {}, // TODO Error handling
                () => {}
            );
        }
    }
}
