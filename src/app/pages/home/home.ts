import { Component, OnInit } from '@angular/core';
import { CardPokemon } from "../../components/card-pokemon/card-pokemon";
import { GetPokemon } from '../../services/get-pokemon';
import { PokemonsPage } from '../../models/PokemonsPage';
import { PokemonsResult } from '../../models/PokemonsResult';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CardPokemon,AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  pokemonspage: Observable<PokemonsPage> | null;
  erro: string | null;
  pokemons: PokemonsResult[];
  limite = 20;
  page = 0;

  constructor(private getPokemon: GetPokemon) { 
    this.pokemonspage = null;
    this.erro = null;
    this.pokemons = [];
  }

  ngOnInit(): void {
    this.loadPokemons();
  }

 
  
  loadPokemons() {
    this.pokemonspage = this.getPokemon.getPokemons(this.page, this.limite);
    this.pokemonspage.subscribe({
      next: (data) => {
        this.pokemons = data.results;
        console.log(this.pokemons);
      },
      error: (err) => {
        this.erro = 'Erro ao carregar os pokémons.';
        console.error(err);
      }
    });
  }

  loadMore() {
    this.page++;
    this.loadPokemons();
  } 
  loadPrevious() {
    if (this.page > 0) {
      this.page--;
      this.loadPokemons();
    }
  }

}
