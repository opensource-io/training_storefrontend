import { Component, OnInit } from '@angular/core';
import { Sku } from '../sku';
import { SkusService } from '../skus.service';
import { routerTransition } from '../router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    animations: [routerTransition()],
    providers: []
})
export class CoursesComponent implements OnInit {

    skus: Sku[] = [];

    constructor(private skusService: SkusService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.loadCourses();
    }

    loadCourses() {
        const skus$ = this.skusService.readAll();
        skus$.subscribe(
            skus => this.skus = skus,
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

    onUpdate($event: Event, sku: Sku) {
        this.router.navigate([sku.skuKey], {relativeTo: this.route});
    }

    onDelete($event: Event, sku: Sku) {
        $event.stopPropagation();
        if (confirm('Are you sure to delete ' + sku.vendorSkuCode
        + ' ' + sku.skuName + '?')) {
            const delete$ = this.skusService.delete(sku.skuKey);
            delete$.subscribe(
                data => {
                    this.loadCourses();
                },
                err => {}, // TODO Error handling
                () => {}
            );
        }
    }
}
