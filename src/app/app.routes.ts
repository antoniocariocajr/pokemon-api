import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PokemonDetails } from './pages/pokemon-details/pokemon-details';

export const routes: Routes = [
    {path:'', component: Home, pathMatch:'full'},
    {path:'pokemon/:name', component: PokemonDetails, pathMatch:'prefix'},
    {path:'**', redirectTo:''}
];
