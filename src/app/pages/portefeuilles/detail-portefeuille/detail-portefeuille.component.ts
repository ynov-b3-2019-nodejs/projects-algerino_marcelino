import {Component, OnInit} from '@angular/core';
import {PortefeuilleService} from '../../../services/portefeuille.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Portefeuille} from '../../../models/portefeuille';
import {Projet} from '../../../models/projet';
import {PageEvent} from '@angular/material/typings/paginator';
import {MatDialog, MatSnackBar} from '@angular/material';
import {FormProjetComponent} from '../../projet/form-projet/form-projet.component';
import {ProjetService} from '../../../services/projet.service';

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
  displayedProjects: Projet[];

  constructor(
    private snackBar: MatSnackBar,
    private portefeuilleService: PortefeuilleService,
    private projetService: ProjetService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router) {
      this.loadData();
  }

  ngOnInit() { }

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
        this.currentPortefeuille.updatedAt = new Date(this.currentPortefeuille.updatedAt);
        this.currentPortefeuille.createdAt = new Date(this.currentPortefeuille.createdAt);

        this.displayedProjects = this.currentPortefeuille.Projets.slice(
          this.page * this.limit,
          (this.page * this.limit) + this.limit);
        this.dataLoaded = true;
      });
    });

  }

  handleReturn() {
    this.router.navigate(['/portefeuille']);
  }

  editDialog(project: Projet) {
    const dialogRef = this.dialog.open(FormProjetComponent);

    dialogRef.componentInstance.onDataProjet(this.currentPortefeuille.id, project);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
        this.snackBar.open(`Projet modifié avec succès !`, 'Ok', {duration: 3000});
      }
    });
  }

  goToDetail(projectId: number) {
    this.router.navigate([`/projets/${projectId}`]);
  }

  deleteLine(projectId: number) {
    this.projetService.delete(projectId).subscribe(() => {
      this.loadData();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormProjetComponent);

    dialogRef.componentInstance.action = 'create';
    dialogRef.componentInstance.onDataProjet(this.currentPortefeuille.id, null);

    dialogRef.afterClosed().subscribe((result: Projet) => {
      if (result) {
        result.PortefeuilleId = this.currentPortefeuille.id;
        this.projetService.create(result);
        this.snackBar.open(`Le Projet ${result.nom} a été créer avec succès !`, 'Ok', {duration: 3000});
        this.loadData();
      }
    });
  }

  pageEvent(event: PageEvent) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.loadData();
  }

}
