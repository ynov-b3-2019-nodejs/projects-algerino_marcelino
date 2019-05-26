import { Projet } from "./../models/projet";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProjetService {

  entityUrl = '/api/projet';

  constructor(private http: HttpClient) { }


  /**
   * Lists projet service
   * @param id   l'ID fait référence à celui du portefeuille
   * @returns    Return toute la liste des projets qui sont lier aux protefeuille
   *
   * Exemple :
   * ```typescript
   * this.ProjetService.list().subscribe((datas: Array<projet>) => {
   * for (const data of datas) {}
   * });
   * ```
   */
  list(id: number) {
    return this.http.get(environment.url + this.entityUrl + "/" + id);
  }


  /**
  * Creates projet service
  * @param projet  - Passe en paramétre l'objet Projet
  *
  * Exemple :
  * ```typescript
  * this.portefeuilleService.create(new Projet()).subscribe(data => {});
  * ```
  */
  create(projet: Projet) {
    return this.http.post(environment.url + this.entityUrl, projet);
  }
}
