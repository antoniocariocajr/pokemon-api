import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component,  Input } from '@angular/core';
import {  Router } from '@angular/router';
import { GetPokemon } from '../../services/get-pokemon';
import { PokemonsResult } from '../../models/PokemonsResult';

@Component({
  selector: 'app-card-pokemon',
  imports: [TitleCasePipe,AsyncPipe],
  templateUrl: './card-pokemon.html',
  styleUrl: './card-pokemon.css',
})
export class CardPokemon {

  @Input("pokemon") pokemon: PokemonsResult = { name: '', url: '' };
  pokemonObservable: any;
  pokemonData: any = null;
  pokemonImage: string = '';

  ngOnInit(): void {
    this.loadDetails();
  }
  constructor(private getPokemon: GetPokemon,private router: Router) { 
  
  }

  loadDetails(): void {
    this.pokemonObservable=this.getPokemon.getPokemonByName(this.pokemon.name)
    this.pokemonObservable.subscribe((data: any) => {
      this.pokemonData = data;
      this.pokemonImage = this.pokemonData.sprites.front_default;
    });
  }
  openDetails(): void {
    const pokemonName = this.pokemon.name;
    this.router.navigate(['/pokemon', pokemonName]);
  }
}
