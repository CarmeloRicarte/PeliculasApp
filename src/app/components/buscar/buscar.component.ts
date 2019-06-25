import {Component, OnInit} from '@angular/core';
import {PeliculasService} from '../../services/peliculas.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {
  buscar = '';

  constructor(public ps: PeliculasService,
              public route: ActivatedRoute) {
    /*
    Cogemos el parámetro de la ruta activa si existe e
    igualamos 'this.buscar' al parametro que recibe
    para que posteriormente se busque la película que se haya escrito
    en el buscador del navbar
     */
    this.route.params.subscribe( parametros => {
      if (parametros.texto) {
        this.buscar = parametros.texto;
        this.buscarPelicula();
     }
    });
  }

  ngOnInit() {
  }

  buscarPelicula() {
    if (this.buscar.length === 0) {
      return;
    }
    this.ps.buscarPelicula(this.buscar)
      .subscribe();
  }
}
