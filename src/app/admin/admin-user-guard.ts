import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import {isAdmin} from '../models/user.model';

@Injectable()
export class OnlyAdminUsersGuard implements CanActivate {
  constructor() {
  }

  canActivate() {
    const user = (<any>window).user;
    return user && isAdmin(user);
  }
}
