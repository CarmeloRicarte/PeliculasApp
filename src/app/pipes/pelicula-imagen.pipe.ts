import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peliculaImagen'
})
export class PeliculaImagenPipe implements PipeTransform {
  /* Con este pipe indicamos que si hay imagen trasera
  de la película, se muestre, si no, la imagen poster
  y si no hay ninguna imagen, una imagen indicando que no hay imagen
   */
  transform(pelicula: any, poster = false): any {
    const URL = 'https://image.tmdb.org/t/p/w500';
    if ( !pelicula  )   {
      return './assets/noimage.png';
    }
    if (poster) {
      return URL + pelicula.poster_path;
    }
    if (pelicula.poster_path) {
      return URL + pelicula.poster_path;
    } else if (pelicula.backdrop_path) {
      return URL + pelicula.backdrop_path;
    } else {
      return 'assets/noimage.png';
    }
  }

}
