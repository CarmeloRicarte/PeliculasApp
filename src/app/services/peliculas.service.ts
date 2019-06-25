import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiKey = 'aca194571b041d8ea19f22a7819f65d9';
  private urlMoviedb = 'https://api.themoviedb.org/3';

  // tslint:disable-next-line:ban-types
  peliculas: any[] = []; // utilizado para el buscador
  constructor(private http: HttpClient) {
  }

  getPelicula(id: string) {
    const URL = `${this.urlMoviedb}/movie/${id}?api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(URL, 'JSONP_CALLBACK')
      .pipe(map(res => res));
  }

  getPopulares() {
    const URL = `${this.urlMoviedb}/discover/movie?sort_by=popularity.desc&api_key=${this.apiKey}&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(URL, 'JSONP_CALLBACK')
      .pipe(map(res => res));
  }
  getCartelera() {
    const fechaDesde = new Date();
    const fechaHasta = new Date();
    fechaHasta.setDate(fechaHasta.getDate() + 7);

    const desdeStr = `${fechaDesde.getFullYear()}-${fechaDesde.getMonth() + 1}-${fechaDesde.getDate()}`;
    const hastaStr = `${fechaHasta.getFullYear()}-${fechaHasta.getMonth() + 1}-${fechaHasta.getDate()}`;

    // tslint:disable-next-line:max-line-length
    const URL = `${this.urlMoviedb}/discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}&api_key=${this.apiKey}&region=ES&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(URL, 'JSONP_CALLBACK')
      .pipe(map(res => res));
  }
  getPopularesNinios() {
    // tslint:disable-next-line:max-line-length
    const URL = `${this.urlMoviedb}/discover/movie?certification_country=ES&certification.lte=G&sort_by=popularity.desc&api_key=${this.apiKey}&region=ES&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(URL, 'JSONP_CALLBACK')
      .pipe(map(res => res));
  }

  buscarPelicula(texto: string) {
    // tslint:disable-next-line:max-line-length
    const URL = `${this.urlMoviedb}/search/movie?query=${texto}&sort_by=popularity.desc&api_key=${this.apiKey}&region=ES&language=es`;
    return this.http.get(URL)
      .pipe(map((res: any) => {
        this.peliculas = res.results;
        console.log(this.peliculas);
        return res.results;
      }));
  }
}
