import {Component, OnInit} from '@angular/core';
import {PortefeuilleService} from '../../../services/portefeuille.service';
import {ActivatedRoute} from '@angular/router';
import {Portefeuille} from '../../../models/portefeuille';

@Component({
  selector: 'app-detail-portefeuille',
  templateUrl: './detail-portefeuille.component.html',
  styleUrls: ['./detail-portefeuille.component.scss']
})
export class DetailPortefeuilleComponent implements OnInit {
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
        console.log('data ==>', data);
        this.dataLoaded = true;
      });
    });

  }

  ngOnInit() { }

}
