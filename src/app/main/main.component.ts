import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']

})
export class MainComponent implements OnInit {

    IsDashboard = false
    isAdmin: boolean = sessionStorage.getItem('login') ? true : false;
    loading: boolean = true;
    goToLoginPageBool: boolean = false;
    routePath: any;

    constructor(private route: Router) {
        this.loadingAction();
    }

    ngOnInit() {

        if (window.location.pathname.startsWith('/dashboard')) {
            this.IsDashboard = true
        }
        else {
            this.IsDashboard = false
        }

        this.route.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                if (window.location.pathname.startsWith('/dashboard')) {
                    this.IsDashboard = true
                }
                else {
                    this.IsDashboard = false
                }
            }
        });
    }

    loadingAction() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }

    loginDone(event: boolean) {
        this.IsDashboard = true
        this.loadingAction();
    }

    goToLoginPage(event: boolean) {
        this.goToLoginPageBool = event;
        this.loadingAction();
    }

}