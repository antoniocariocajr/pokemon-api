import { AsyncPipe, TitleCasePipe, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { GetPokemon } from '../../services/get-pokemon';
import { PokemonsResult } from '../../models/PokemonsResult';
import { PokemonDetails } from '../../models/PokemonDetails';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-pokemon',
  imports: [TitleCasePipe, AsyncPipe, NgOptimizedImage],
  templateUrl: './card-pokemon.html',
  styleUrl: './card-pokemon.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPokemon implements OnInit {

  @Input("pokemon") pokemon: PokemonsResult = { name: '', url: '' };
  pokemonObservable$: Observable<PokemonDetails> | null = null;
  pokemonData: PokemonDetails | null = null;
  pokemonImage: string = '';

  constructor(private getPokemon: GetPokemon, private router: Router) { }

  ngOnInit(): void {
    this.loadDetails();
  }

  loadDetails(): void {
    this.pokemonObservable$ = this.getPokemon.getPokemonByName(this.pokemon.name);
    this.pokemonObservable$.subscribe((data: PokemonDetails) => {
      this.pokemonData = data;
      this.pokemonImage = this.pokemonData.sprites.other?.['official-artwork'].front_default || this.pokemonData.sprites.front_default;
    });
  }
  openDetails(): void {
    const pokemonName = this.pokemon.name;
    this.router.navigate(['/pokemon', pokemonName]);
  }
}
