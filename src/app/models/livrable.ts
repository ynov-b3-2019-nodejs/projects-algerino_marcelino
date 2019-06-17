import {Statut} from './statut';
import { Projet } from './projet';

export class Livrable {
  id: number;
  nom: string;

  dateprevu: Date;
  datefin: Date;

  createdAt: Date;
  updatedAt: Date;

  ProjetId: number;
  StatutId: number;

  Projet: Projet;
  Statut: Statut;

  constructor(nom: string, dateprevu: Date, datefin: Date, ProjetId: number, StatutId: number, id?: number) {
    this.nom = nom;
    this.dateprevu = dateprevu;
    this.datefin = datefin;
    this.ProjetId = ProjetId;
    this.StatutId = StatutId;

    if (id) {
      this.id = id;
    }
  }
}
