import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Event } from "../models/event";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  entityUrl = '/api/event';

  constructor(private http: HttpClient) { }

  /**
    * SERVICES :  Affichage de tout les projets
   * @returns    Return toute la liste des evénements
   *
   * Exemple :
   * ```typescript
   * this.EventService.list().subscribe((datas: Array<event>) => {});
   * ```
   */
  list() {
    return this.http.get(environment.url + this.entityUrl + "/");
  }

  /**
* SERVICES :  Création d'un projet
* @param Event  - Passe en paramétre l'objet Event
*
* Exemple :
* ```typescript
* this.EventService.create(new Event()).subscribe(data => {});
* ```
*/
  create(event: Event) {
    return this.http.post(environment.url + this.entityUrl, event);
  }

  /**
* SERVICES :  Création d'un projet
* @param Event  - Passe en paramétre l'objet Event
*
* Exemple :
* ```typescript
* this.EventService.create(new Event()).subscribe(data => {});
* ```
*/
  update(event: Event) {
    return this.http.patch(environment.url + this.entityUrl, event);
  }

  /**
* SERVICES :  Création d'un projet
* @param Event  - Passe en paramétre l'objet Event
*
* Exemple :
* ```typescript
* this.EventService.create(new Event()).subscribe(data => {});
* ```
*/
  getById(id: number) {
    return this.http.get(environment.url + this.entityUrl + "/" + id);
  }

  /**
* SERVICES :  Création d'un projet
* @param Event  - Passe en paramétre l'objet Event
*
* Exemple :
* ```typescript
* this.EventService.create(new Event()).subscribe(data => {});
* ```
*/
  delete(id: number) {
    return this.http.delete(environment.url + this.entityUrl + "/" + id);
  }


}
