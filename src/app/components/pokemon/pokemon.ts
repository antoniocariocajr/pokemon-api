import { Component, OnInit } from '@angular/core';
import { GetPokemon } from '../../services/get-pokemon';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  imports: [TitleCasePipe, CommonModule],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css',
})
export class Pokemon implements OnInit {

  pokemon: any;
  loading = false;
  erro: string | null = null;

  constructor(private getPokemon: GetPokemon) { }

  async ngOnInit(): Promise<void> {
    await this.buscarPokemon('pikachu');
  }

  async buscarPokemon(nome: string): Promise<void> {
    this.loading = true;
    this.erro = null;
    try {
      this.pokemon = await this.getPokemon.getPokemons(nome);
    } catch (e) {
      this.erro = 'Pokémon não encontrado ou erro na requisição.';
      this.pokemon = null;
    } finally {
      this.loading = false;
    }
  }

}
