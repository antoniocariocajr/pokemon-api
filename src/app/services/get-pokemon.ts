import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonsPage } from '../models/PokemonsPage';
import { PokemonDetails } from '../models/PokemonDetails';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetPokemon {
  private apiUrl = 'https://pokeapi.co/api/v2';
  private cache = new Map<string, PokemonDetails>();

  constructor(private http: HttpClient) { }

  getPokemons(page: number, limit: number): Observable<PokemonsPage> {
    const offset = (page) * limit;
    const url = `${this.apiUrl}/pokemon?offset=${offset}&limit=${limit}`;
    return this.http.get<PokemonsPage>(url);
  }

  getPokemonByName(name: string): Observable<PokemonDetails> {
    if (this.cache.has(name)) {
      return of(this.cache.get(name)!);
    }
    const url = `${this.apiUrl}/pokemon/${name}`;
    return this.http.get<PokemonDetails>(url).pipe(
      tap(data => this.cache.set(name, data))
    );
  }

}