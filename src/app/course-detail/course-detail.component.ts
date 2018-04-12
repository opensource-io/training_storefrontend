import { Component, OnInit, Input } from '@angular/core';
import { Sku } from '../sku';
import { SkusService } from '../skus.service';
import { Vendor } from '../vendor';
import { VendorsService } from '../vendors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  sku: Sku;
  sku$: Observable<Sku>;
  vendors: Vendor[];
  saving = false;

  constructor(private route: ActivatedRoute, private router: Router, private skusService: SkusService,
    private vendorsService: VendorsService) { }

  ngOnInit() {
    this.sku$ = this.route.paramMap
    .switchMap((params: ParamMap) => {
      const id = params.get('id');
      if (id === 'new') {
        return <Observable<Sku>>Observable.of({
          skuKey: null,
          skuVendor: {
            vendorKey: null
          },
          vendorSkuCode: null,
          skuName: null,
          skuDescription: null,
          classLength: null
        });
      }
      return this.skusService.read(id);
    });
    this.sku$.subscribe(s => this.sku = s);

    const vendors$ = this.vendorsService.readAll();
    vendors$.subscribe(
        vendors => this.vendors = vendors,
        (err: HttpErrorResponse) => {
            if (err.status === 401 || err.status === 403) {
                this.router.navigate(['/logout']);
            }
        }
    );
  }

  onSubmit() {
    this.saving = true;
    if (this.sku.skuKey) {
      const skuUpdate$ = this.skusService.update(this.sku);
      skuUpdate$.subscribe(s => this.sku = s, err => {}, () => { this.saving = false; });
    } else {
      const skuCreate$ = this.skusService.create(this.sku);
      skuCreate$.subscribe(s => {
        this.sku = s;
        this.router.navigate(['../', s.skuKey], {relativeTo: this.route})
      }, err => {}, () => { this.saving = false; });
    }
  }

}
