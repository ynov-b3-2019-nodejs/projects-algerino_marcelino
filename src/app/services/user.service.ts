import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  entityUrl = '/api/user';

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get(environment.url + this.entityUrl);
  }

  update(user) {
    return this.http.post(environment.url + this.entityUrl + '/' + user.id, user);
  }

  create(user) {
    return this.http.post(environment.url + this.entityUrl, user);
  }

  delete(id) {
    return this.http.delete(environment.url + this.entityUrl + '/' + id);
  }
}
