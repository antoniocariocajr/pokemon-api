import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokemon } from "./components/pokemon/pokemon";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Pokemon],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokemon-api');
}
