import { LivrableService } from './../../../services/livrable.service';
import { Livrable } from './../../../models/livrable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-livrable-detail',
  templateUrl: './livrable-detail.component.html',
  styleUrls: ['./livrable-detail.component.scss']
})
export class LivrableDetailComponent implements OnInit {


  livrable: Livrable
  isDataLoaded: boolean

  constructor(private activeRoute: ActivatedRoute, private livrableService: LivrableService) { }

  ngOnInit() {
    this.isDataLoaded = false

    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.livrableService.detail(params['id']).subscribe((data: Livrable) => {

          this.livrable = data

          this.isDataLoaded = true;
        });
      }
    })
  }

}

