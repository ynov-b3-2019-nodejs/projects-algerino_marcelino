import {Statut} from './statut';

export class Portefeuille {
  id: number;
  StatutId: number;
  nom: string;
  createdAt: Date;
  updatedAt: Date;
  Statut: Statut;

  constructor(nom: string, statutId: number, id?: number, createdAt?: Date, updatedAt?: Date) {
    this.nom = nom;
    this.StatutId = statutId;

    if (id) {
      this.id = id;
    }
    if (createdAt) {
      this.createdAt = createdAt;
    }
    if (updatedAt) {
      this.updatedAt = updatedAt;
    }
  }
}
