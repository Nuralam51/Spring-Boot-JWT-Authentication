import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WhiteSpaceValidator } from 'src/app/validators/white-space-validator';

import { Users } from '../../common/users';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginFormGroup: FormGroup;
    users: Users = new Users();

    constructor(private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router) { }

    ngOnInit(): void {

        this.loginFormGroup = this.formBuilder.group({
            username: new FormControl('', [Validators.required, WhiteSpaceValidator.notOnlyWhitespace]),
            password: new FormControl('', [Validators.required, 
                Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'), 
                WhiteSpaceValidator.notOnlyWhitespace])
        });

        if (this.loginService.currentUserValue) {
            this.router.navigate(['/home']);
        }
    }

    get username() { return this.loginFormGroup.get('username'); }
    get password() { return this.loginFormGroup.get('password'); }

    login() {
        if (this.loginFormGroup.invalid) {
            this.loginFormGroup.markAllAsTouched();
            return;
        }
        this.loginService.login(this.loginFormGroup.value).subscribe(data => {
            this.router.navigate(['/home']);
        });
    }

}
