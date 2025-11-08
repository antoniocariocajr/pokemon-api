import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetPokemon } from '../../services/get-pokemon';
import { PokemonData } from '../../models/PokemonData';
import { AsyncPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  imports: [AsyncPipe,UpperCasePipe,TitleCasePipe],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.css',
})
export class PokemonDetails {
  pokemonObserve: any;
  pokemonData: PokemonData;
  pokemonName: string;
  pokemonImageUrl: {url:string,name:string}[];
  activatedRoute = inject(ActivatedRoute);

  constructor(private getPokemon: GetPokemon, private router:Router) {
    this.pokemonData = {} as PokemonData;
    this.pokemonImageUrl = [];
    this.pokemonName = this.activatedRoute.snapshot.params['name'];
    this.loadPokemonDetails();
  }

  loadPokemonDetails() {
    this.pokemonObserve = this.getPokemon.getPokemonByName(this.pokemonName);
    this.pokemonObserve.subscribe((data: PokemonData) => {
      this.pokemonData = data;
      this.loadPokemonImages();
      console.log(this.pokemonData);
    });
  }

  loadPokemonImages() {
    this.pokemonImageUrl = [
      {url: this.pokemonData.sprites.front_default, name: 'Front'},
      {url: this.pokemonData.sprites.back_default, name: 'Back'},
      {url: this.pokemonData.sprites.front_shiny, name: 'Front Shiny'},
      {url: this.pokemonData.sprites.back_shiny, name: 'Back Shiny'},
    ];
    if (this.pokemonData.sprites.front_female!== null) {
      this.pokemonImageUrl.push({url: this.pokemonData.sprites.front_female, name:'Front Female'});
    }
    if (this.pokemonData.sprites.back_female!== null) {
      this.pokemonImageUrl.push({url: this.pokemonData.sprites.back_female, name:'Back Female'});
    }
    if (this.pokemonData.sprites.front_shiny_female!== null) {
      this.pokemonImageUrl.push({ url: this.pokemonData.sprites.front_shiny_female, name:'Front Shiny Female' });
    }
    if (this.pokemonData.sprites.back_shiny_female!== null) {
      this.pokemonImageUrl.push({url:this.pokemonData.sprites.back_shiny_female, name:'Back Shiny Female'});
    }
  }

  chagerImage(url: string) {
    const image = document.getElementById('pokemon_image') as HTMLImageElement;
    image.src = url;
  }

  back() {
    this.router.navigate(['/']);
  }
}
