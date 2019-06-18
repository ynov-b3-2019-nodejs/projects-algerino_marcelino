import {Statut} from './statut';
import {Projet} from './projet';

export class Portefeuille {
  id: number;
  StatutId: number;
  projetsId: number[];
  nom: string;
  createdAt: Date;
  updatedAt: Date;
  Statut: Statut;
  Projets: Projet[];

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
