import { Component, OnInit } from '@angular/core';
import { Instructor } from '../instructor';
import { InstructorsService } from '../instructors.service';
import { routerTransition } from '../router.animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-instructors',
    templateUrl: './instructors.component.html',
    styleUrls: ['./instructors.component.scss'],
    animations: [routerTransition()],
    providers: []
})
export class InstructorsComponent implements OnInit {

    instructors: Instructor[];

    constructor(private instructorsService: InstructorsService, private router: Router) {
    }

    ngOnInit() {
        const instructors$ = this.instructorsService.loadInstructors();
        instructors$.subscribe(
            instructors => this.instructors = instructors,
            (err: HttpErrorResponse) => {
                if (err.status === 401 || err.status === 403) {
                    this.router.navigate(['/logout']);
                }
            }
        );
    }
}
