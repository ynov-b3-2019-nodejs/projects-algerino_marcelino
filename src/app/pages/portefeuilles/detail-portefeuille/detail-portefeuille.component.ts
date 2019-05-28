import {Component, OnInit} from '@angular/core';
import {PortefeuilleService} from '../../../services/portefeuille.service';
import {ActivatedRoute} from '@angular/router';
import {Portefeuille} from '../../../models/portefeuille';
import {Projet} from '../../../models/projet';
import {PageEvent} from '@angular/material/typings/paginator';

@Component({
  selector: 'app-detail-portefeuille',
  templateUrl: './detail-portefeuille.component.html',
  styleUrls: ['./detail-portefeuille.component.scss']
})
export class DetailPortefeuilleComponent implements OnInit {
  displayedColumns = ['nom', 'updatedAt', 'Statut', 'action'];
  limit = 5;
  page = 0;
  dataLoaded = false;
  currentPortefeuille: Portefeuille;

  constructor(
    private portefeuilleService: PortefeuilleService,
    private activatedRoute: ActivatedRoute) {
      this.loadData();
  }

  loadData() {
    this.dataLoaded = false;

    this.activatedRoute.params.subscribe((params) => {
      this.portefeuilleService.get('id', params.id).subscribe((data) => {
        this.currentPortefeuille = data;
        this.currentPortefeuille.Projets = data.Projets.map((p: Projet) => {
          return {
            ...p,
            createdAt: new Date(p.createdAt),
            updatedAt: new Date(p.updatedAt)
          };
        });
        this.dataLoaded = true;
      });
    });

  }

  ngOnInit() { }

  goToDetail(projectId: number) {

  }

  editDialog(project: Projet) {

  }

  deleteLine(projectId: number) {

  }

  pageEvent(event: PageEvent) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.loadData();
  }

}
