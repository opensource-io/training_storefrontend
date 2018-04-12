import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    appName = environment.name;
    pushRightClass = 'push-right';
    user: User;

    constructor(private userService: UserService, private translate: TranslateService, public router: Router) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.loadUser();
    }

    loadUser() {
        const user$ = this.userService.loadUser();
        user$.subscribe(
            user => this.user = user,
            (err: HttpErrorResponse) => {
                if (err.status === 401 || err.status === 403) {
                    this.router.navigate(['/logout']);
                }
            }
        );
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        window.location.href = environment.apiEndpoint + '/logout';
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
