import { Injectable } from '@angular/core';
import { MovieCollection } from '../models/movie-collection.interface';
import { TMDbMovieResult } from '../models/tmdb-movie-result.interface';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private readonly STORAGE_KEY = 'movie-collections';

  getCollections(): MovieCollection[] {
    const collectionsJson = localStorage.getItem(this.STORAGE_KEY);
    return collectionsJson ? JSON.parse(collectionsJson) : [];
  }

  getCollectionByTitle(title: string): MovieCollection | undefined {
    const collections = this.getCollections();
    return collections.find((c) => c.title === title);
  }

  addCollection(title: string, description: string): boolean {
    const collections = this.getCollections();
    if (collections.find((c) => c.title === title)) {
      return false;
    }
    collections.push({ title, description, movies: [] });
    this.saveCollections(collections);
    return true;
  }

  addMovieToCollection(
    collectionTitle: string,
    movie: TMDbMovieResult
  ): boolean {
    const collections = this.getCollections();
    const collection = collections.find((c) => c.title === collectionTitle);
    if (collection) {
      if (!collection.movies.find((m) => m.id === movie.id)) {
        collection.movies.push(movie);
        this.saveCollections(collections);
        return true;
      }
    }
    return false;
  }

  removeMovieFromCollection(collectionTitle: string, movieId: number): boolean {
    const collections = this.getCollections();
    const collection = collections.find((c) => c.title === collectionTitle);
    if (collection) {
      const movieIndex = collection.movies.findIndex((m) => m.id === movieId);
      if (movieIndex > -1) {
        collection.movies.splice(movieIndex, 1);
        this.saveCollections(collections);
        return true;
      }
    }
    return false;
  }

  private saveCollections(collections: MovieCollection[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(collections));
  }
}
