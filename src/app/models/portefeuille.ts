import {Statut} from './statut';

export class Portefeuille {
  id: number;
  StatutId: number;
  nom: string;
  createdAt: Date;
  updatedAt: Date;
  Statut: Statut;

  constructor(nom: string, statutId: number) {
    this.nom = nom;
    this.StatutId = statutId;
  }
}
