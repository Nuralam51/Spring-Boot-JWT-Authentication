import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/common/users';
import { LoginService } from 'src/app/services/login.service';
import { WhiteSpaceValidator } from '../../validators/white-space-validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerFormGroup: FormGroup;

    users: Users = new Users();

    constructor(private formBuilder: FormBuilder,
                private loginService: LoginService, 
                private router: Router) { }

    ngOnInit(): void {
        this.registerFormGroup = this.formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.minLength(3), WhiteSpaceValidator.notOnlyWhitespace]),
            username: new FormControl('', [Validators.required, Validators.minLength(3), WhiteSpaceValidator.notOnlyWhitespace]),
            email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
            password: new FormControl('', [Validators.required, 
                Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'), 
                WhiteSpaceValidator.notOnlyWhitespace])
        });
    }

    get name() { return this.registerFormGroup.get('name') }
    get username() { return this.registerFormGroup.get('username') }
    get email() { return this.registerFormGroup.get('email') }
    get password() { return this.registerFormGroup.get('password') }
    

    register() {
        if(this.registerFormGroup.invalid){
            this.registerFormGroup.markAllAsTouched();
            return;
        }
        this.loginService.register(this.registerFormGroup.value).subscribe(data => {
            this.router.navigate(["/login"]);
        })
    }

}
