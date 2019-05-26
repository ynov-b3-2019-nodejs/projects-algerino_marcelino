import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Portefeuille} from '../models/portefeuille';

@Injectable({
  providedIn: 'root'
})
export class PortefeuilleService {

  entityUrl = '/api/portefeuille';

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get(environment.url + this.entityUrl);
  }

  create(portefeuille: Portefeuille) {
    return this.http.post<Portefeuille>(environment.url + this.entityUrl, portefeuille);
  }

  update(portefeuille: Portefeuille) {
    return this.http.put<Portefeuille>(environment.url + this.entityUrl + '/' + portefeuille.id, portefeuille);
  }

  delete(portefeuilleId: number) {
    return this.http.delete<Portefeuille>(environment.url + this.entityUrl + '/' + portefeuilleId);
  }
}
