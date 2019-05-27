import { Portefeuille } from './portefeuille';
import { Statut } from "./statut";

export class Projet {
  id: number;
  nom: string;
  createdAt: Date;
  updatedAt: Date;

  PortefeuilleId: number;
  StatutId: number;

  Portefeuille: Portefeuille;
  Statut: Statut;


  constructor(nom: string, statutId: number, portefeuilleId: number , id?: number) {
    this.nom = nom;
    this.StatutId = statutId;
    this.PortefeuilleId = portefeuilleId;

    if(id){
      this.id = id;
    }
  }
}
