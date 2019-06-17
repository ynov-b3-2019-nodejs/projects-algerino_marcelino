import { Projet } from './../models/projet';
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
    * SERVICES :  Affichage de tout les projets
   * @param id   l'ID fait référence à celui du portefeuille
   * @param page Page souhaité
   * @param limit Nombre d'élément à récupérer
   * @returns    Return toute la liste des projets qui sont lier aux protefeuille
   *
   * Exemple :
   * ```typescript
   * this.ProjetService.list().subscribe((datas: Array<projet>) => {});
   * ```
   */
  list(id: number, page: number, limit: number) {
    return this.http.get(environment.url + this.entityUrl + '/' + id + '?page=' + page + '&limit=' + limit);
  }


  /**
  * SERVICES :  Création d'un projet
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

  /**
  * SERVICES :  Edition d'un projet
  * @param projet  - Passe en paramétre l'objet Projet
  *
  * Exemple :
  * ```typescript
  * this.portefeuilleService.edit(new Projet()).subscribe(data => {});
  * ```
  */
  edit(projet: Projet) {
    return this.http.patch(environment.url + this.entityUrl, projet);
  }

  /**
  * SERVICES :  Suppression d'un projet
  * @param id  - Passe en paramétre l'id de l'objet
  *
  * Exemple :
  * ```typescript
  * this.portefeuilleService.delete(id).subscribe(data => {});
  * ```
  */
  delete(id: number) {
    return this.http.delete(environment.url + this.entityUrl + '/' + id);
  }

  /**
    * SERVICES :  Suppression d'un projet
    * @param id  - Passe en paramétre l'id de l'objet
    *
    * Exemple :
    * ```typescript
    * this.portefeuilleService.detail(id).subscribe(data => {});
    * ```
    */
  detail(id: number) {
    return this.http.get(environment.url + this.entityUrl + '/detail/' + id);
  }


  count(portefeuilleId: number) {
    console.log('portefeuilleId ==>', portefeuilleId);
    return this.http.get<number>(environment.url + this.entityUrl + '/count?prid=' + portefeuilleId);
  }
}
