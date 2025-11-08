import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetPokemon {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  async getPokemons(nomePokemon: string): Promise<any> {
    const url = `${this.apiUrl}/pokemon/${nomePokemon.toLowerCase()}`;
    try {
      // Usa lastValueFrom para converter o Observable em uma Promise
      // para que await possa ser usado.
      const dados = await lastValueFrom(this.http.get<any>(url));
      return dados;
    } catch (error) {
      console.error('Erro ao buscar o Pokémon:', error);
      throw error;
    }
  }
}
