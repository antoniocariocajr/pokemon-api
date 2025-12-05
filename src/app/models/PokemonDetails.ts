export interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        other?: {
            'official-artwork': {
                front_default: string;
            }
        }
    };
    types: Array<{
        type: {
            name: string;
            url: string;
        }
    }>;
    weight: number;
    height: number;
}
