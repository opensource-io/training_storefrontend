import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { User } from '../user';
import { UserService } from '../user.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    appName = environment.name;

    constructor(public router: Router, private userService: UserService) {
    }

    ngOnInit() {
        const user$ = this.userService.loadUser();
        user$.subscribe(
            user => {
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigate(['/']);
            }
        );
    }

    onLoggedin() {
        window.location.href = environment.apiEndpoint + '/login';
    }

}
