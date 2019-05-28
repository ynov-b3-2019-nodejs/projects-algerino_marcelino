import {Component, OnInit} from '@angular/core';
import {PortefeuilleService} from '../../../services/portefeuille.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Portefeuille} from '../../../models/portefeuille';
import {Projet} from '../../../models/projet';
import {PageEvent} from '@angular/material/typings/paginator';
import {MatDialog, MatSnackBar} from '@angular/material';
import {EditPortefeuilleComponent} from '../edit-portefeuille/edit-portefeuille.component';
import {ProjetDetailComponent} from '../../projet/projet-detail/projet-detail.component';

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
    private snackBar: MatSnackBar,
    private portefeuilleService: PortefeuilleService,
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
        this.dataLoaded = true;
      });
    });

  }

  goToDetail(projectId: number) {
    this.router.navigate([`/projet/${projectId}`]);
  }

  editDialog(project: Projet) {
    const dialogRef = this.dialog.open(ProjetDetailComponent);

    dialogRef.componentInstance.getCurrentPortefeuille();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
        this.snackBar.open(`Projet modifié avec succès !`, 'Ok', {duration: 3000});
      }
    });
  }

  deleteLine(projectId: number) {

  }

  pageEvent(event: PageEvent) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.loadData();
  }

}
