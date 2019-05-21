import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatutService {

  entityUrl = '/api/statut';

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get(environment.url + this.entityUrl);
  }

}
