export type PokemonData = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: { slot: number; type: { name: string; url: string } }[];
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    front_female: string | null;
    back_female: string | null;
    front_shiny_female: string | null;
    back_shiny_female: string | null;
  };
  abilities: { ability: { name: string; url: string }; is_hidden: boolean; slot: number }[];
  stats: { base_stat: number; effort: number; stat: { name: string; url: string } }[];
  moves: { move: { name: string; url: string } }[];
  past_types: any[];
  past_abilities: { 
    abilities: {
        ability: { name: string; url: string }; 
        is_hidden: boolean; 
        slot: number; 
    }[];
    generation: { name: string; url: string }
  }[];
};