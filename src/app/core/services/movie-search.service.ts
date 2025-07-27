import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TMDbSearchResponse } from '../models/tmdb-search-response.interface';

@Injectable({
  providedIn: 'root', // Service is available application-wide
})
export class SearchService {
  private http = inject(HttpClient);

  private readonly API_KEY = environment.apiKey;
  private readonly API_URL = 'https://api.themoviedb.org/3/search/movie';
  readonly IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

  searchMovies(query: string, page: number): Observable<TMDbSearchResponse> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('query', query)
      .set('page', page.toString());

    return this.http.get<TMDbSearchResponse>(this.API_URL, { params });
  }
}
