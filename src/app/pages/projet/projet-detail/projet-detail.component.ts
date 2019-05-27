import { Projet } from './../../../models/projet';
import { ProjetService } from './../../../services/projet.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projet-detail',
  templateUrl: './projet-detail.component.html',
  styleUrls: ['./projet-detail.component.scss']
})
export class ProjetDetailComponent implements OnInit {

  projet: Projet
  isDataLoaded : boolean

  constructor(private activeRoute: ActivatedRoute, private projetService: ProjetService) { }

  ngOnInit() {
    this.isDataLoaded = false

    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.projetService.detail(params['id']).subscribe((data: Projet) => {

          data.createdAt = new Date(Date.parse(Date()));
          data.updatedAt = new Date(Date.parse(Date()));

          this.projet = data

          this.isDataLoaded = true;
        });
      }
    })
  }

}
