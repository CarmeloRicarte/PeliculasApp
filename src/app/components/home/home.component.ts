import {Component, OnInit} from '@angular/core';
import {PeliculasService} from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  cartelera: any;
  populares: any;
  popuNinios: any;

  constructor(public ps: PeliculasService) {
    this.ps.getCartelera()
      .subscribe((data: any) => this.cartelera = data.results);
    this.ps.getPopulares()
      .subscribe((data: any) => this.populares = data.results);
    this.ps.getPopularesNinios()
      .subscribe((data: any) => this.popuNinios = data.results);
  }

  ngOnInit() {
  }
}
