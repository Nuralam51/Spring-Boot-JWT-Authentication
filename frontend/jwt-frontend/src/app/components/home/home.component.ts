import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/common/users';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    currentUser: Users = new Users();

    constructor(private loginService: LoginService, private route: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.currentUser)
    }

    ngOnInit(): void {
        if (!this.currentUser) {
            this.route.navigate(['/login']);
        }
    }

    logout() {
        this.loginService.logout().subscribe(data => {
            this.route.navigate(['/login']);
        });
    }

}
