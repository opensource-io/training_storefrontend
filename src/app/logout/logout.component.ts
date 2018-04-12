import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { User } from '../user';
import { UserService } from '../user.service';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-logout',
    template: '',
    styleUrls: [],
    animations: [routerTransition()]
})
export class LogoutComponent implements OnInit {

    constructor(public router: Router, private userService: UserService) {
    }

    ngOnInit() {
        localStorage.removeItem('isLoggedin');
        window.location.href = environment.apiEndpoint + '/logout';
    }

}
