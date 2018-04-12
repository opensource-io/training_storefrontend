import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { ClassSessionsService } from '../class-sessions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SkusService } from '../skus.service';
import { DatePipe, NgClass } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ClassSession } from '../class-session';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-class-sessions',
    templateUrl: './class-sessions.component.html',
    styleUrls: ['./class-sessions.component.scss'],
    animations: [routerTransition()],
    providers: [DatePipe, NgClass]
})
export class ClassSessionsComponent implements OnInit {
    classSessions: ClassSession[] = [];

    classSkuOptions = [
    ];

    constructor(private classSessionsService: ClassSessionsService, private skusService: SkusService, private datePipe: DatePipe,
        private ngClass: NgClass, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.loadClasses();
    }

    loadClasses() {
        const classSessions$ = this.classSessionsService.readAll();
        classSessions$.subscribe(
            classSessions => this.classSessions = classSessions,
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

    onUpdate($event: Event, classSession: ClassSession) {
        this.router.navigate([classSession.classSessionKey], {relativeTo: this.route});
    }

    onDelete($event: Event, classSession: ClassSession) {
        $event.stopPropagation();
        if (confirm('Are you sure to delete ' + classSession.classSessionSku.vendorSkuCode
        + ' on ' + classSession.classSessionStartDate + '?')) {
            const classSessionDelete$ = this.classSessionsService.delete(classSession.classSessionKey);
            classSessionDelete$.subscribe(
                data => {
                    this.loadClasses();
                },
                err => {}, // TODO Error handling
                () => {}
            );
        }
    }

}
