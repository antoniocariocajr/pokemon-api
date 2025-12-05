import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CardPokemon } from "../../components/card-pokemon/card-pokemon";
import { GetPokemon } from '../../services/get-pokemon';
import { AsyncPipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of, Observable, tap } from 'rxjs';
import { PokemonsPage } from '../../models/PokemonsPage';

@Component({
  selector: 'app-home',
  imports: [CardPokemon, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  page = signal(0);
  limit = 20;

  error = signal<string | null>(null);

  // Convert signal to observable to trigger the http request
  // Ideally with Angular 19+ we could use resource() but let's stick to safe signal-interop for now to ensure compatibility
  pokemonspage$: Observable<PokemonsPage | null>;

  constructor(private getPokemon: GetPokemon) {
    this.pokemonspage$ = toObservable(this.page).pipe(
      switchMap(currentPage => this.getPokemon.getPokemons(currentPage, this.limit).pipe(
        tap(() => this.error.set(null)),
        catchError(err => {
          console.error(err);
          this.error.set('Erro ao carregar os pokémons.');
          return of(null);
        })
      ))
    );
  }

  loadMore() {
    this.page.update(p => p + 1);
  }

  loadPrevious() {
    if (this.page() > 0) {
      this.page.update(p => p - 1);
    }
  }
}
