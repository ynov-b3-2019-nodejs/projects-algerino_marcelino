import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {TokenStorage} from '../auth/token.storage';
import {TooltipComponent} from '@angular/material';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private token: TokenStorage) {
  }

  public $userSource = new Subject<User>();

  login(email: string, password: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post(environment.url + '/api/auth/login', {
        email,
        password
      }).subscribe((data: any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        this.token.saveToken(data.token);
        observer.complete();
      });
    });
  }

  register(fullname: string, email: string, password: string, repeatPassword: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post(environment.url + '/api/auth/register', {
        fullname,
        email,
        password,
        repeatPassword
      }).subscribe((data: any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        this.token.saveToken(data.token);
        observer.complete();
      });
    });
  }

  setUser(user: User): void {
    this.$userSource.next(user);
    (<any>window).user = user;
  }

  getUser(): Observable<User> {
    return this.$userSource.asObservable();
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();
      if (!tokenVal) {
        return observer.complete();
      }
      this.http.get(environment.url + '/api/auth/me').subscribe((data: any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        observer.complete();
      });
    });
  }

  signOut(): void {
    this.token.signOut();
    this.setUser(null);
    delete (<any>window).user;
  }
}
