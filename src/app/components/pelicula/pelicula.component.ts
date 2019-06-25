import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PeliculasService} from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: []
})
export class PeliculaComponent implements OnInit {
  pelicula: any;
  regresarA: string;
  busqueda = '';

  constructor(public ps: PeliculasService,
              public route: ActivatedRoute) {
    /*
    Cogemos el parámetro de la ruta activa
     */
    this.route.params.subscribe( parametros => {
      // con eso cogemos el parámetro de la página desde donde venimos
      this.regresarA = parametros.pag;

      // esto lo hacemos para que al regresar, nos regrese con
      if (parametros.busqueda) {
        console.log(parametros.busqueda);
        this.busqueda = parametros.busqueda;
      }
      this.ps.getPelicula(parametros.id)
        .subscribe(pelicula => {
          console.log(pelicula);
          this.pelicula = pelicula;
        });
    });
  }

  ngOnInit() {
  }

}
