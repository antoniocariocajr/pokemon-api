import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonsPage } from '../models/PokemonsPage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetPokemon {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(page: number, limit: number): Observable<PokemonsPage> {
    const offset = (page) * limit;
    const url = `${this.apiUrl}/pokemon?offset=${offset}&limit=${limit}`;
    return this.http.get<PokemonsPage>(url);
  }
  getPokemonByName(name: string): Observable<any> {
    const url = `${this.apiUrl}/pokemon/${name}`;
    return this.http.get<any>(url);
  }

}