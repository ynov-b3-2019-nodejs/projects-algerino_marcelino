import { Projet } from './projet';

export class Event {
  id: number;
  titre: string;

  datedebut: Date;
  datefin: Date;

  createdAt: Date;
  updatedAt: Date;

  ProjetId: number;

  Projet: Projet;

  constructor(titre: string, datedebut: Date, datefin: Date, ProjetId: number, id?: number) {
    this.titre = titre;
    this.datedebut = datedebut;
    this.datefin = datefin;
    this.ProjetId = ProjetId;

    if (id) {
      this.id = id;
    }
  }
}
