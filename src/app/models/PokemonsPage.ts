export type PokemonsPage = {
    results:{
        name:string
        url:string
    }[]
    next:string
    previous:string|null
}