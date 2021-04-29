import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../common/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

let URL = "http://localhost:8080/";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public currentUser: Observable<Users>;
    private currentUserSubject: BehaviorSubject<Users>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Users {
        return this.currentUserSubject.value;
    }

    login(users: Users): Observable<any> {
        const headers = new HttpHeaders({
            authorization: 'Basic ' + btoa(users.username + ':' + users.password)
        });

        return this.http.get<any>(URL + "login", { headers: headers }).pipe(
            map(response => {
                if (response) {
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    this.currentUserSubject.next(response);
                }
            })
        );
    }

    logout(): Observable<any> {
        return this.http.post(URL + "logout", {}).pipe(
            map(response => {
                localStorage.removeItem('currentUser');
                this.currentUserSubject.next(null);
            })
        );
    }

    register(users: Users): Observable<any> {
        return this.http.post(URL + "register", JSON.stringify(users),
            { headers: { "Content-Type": "application/json; charset-UTF-8" } });
    }
}
